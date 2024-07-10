import { Post, User } from "../models";
import PaginationUtils from "../utils/pagination";
import { Sequelize, literal } from 'sequelize';

class PostService {
    create(post) {
        return Post.create(post);
    }

    async list(filter) {
        const whereCondition = {
            is_deleted: false,
            available_at: {
                [Sequelize.Op.lte]: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }
        const pagination = PaginationUtils.config({ page: filter.page, items_per_page: 20 });
        
        const promises = [];
        
        promises.push(
            Post.findAll({
                where: whereCondition,
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }],
                attributes: [
                    'id', 
                    'user_id', 
                    'available_at', 
                    'title', 
                    'summary', 
                    'content', 
                    literal('CASE WHEN post.user_id = :userId THEN true ELSE false END as is_owner')
                ],
                raw : true,
                nest: true,
                order: [['available_at', 'DESC']],
                replacements: { userId: filter.loggedUserId },
                ...pagination.getQueryParams()
            })
        );
        
        const isFirstPage = pagination.getPage() === 1;
        
        if (isFirstPage) {
            promises.push(
                Post.count({
                    where: whereCondition
                })
            );
        }
        
        const [posts, totalItems] = await Promise.all(promises);

        return {
            ...pagination.mount(totalItems),
            posts
        };
    }
    async remove(filter){
        await Post.update({is_deleted: true},{
            where: {
                id: filter.id,
                user_id: filter.user_id,
                is_deleted: false
            }
        })
    };
}
export default PostService;