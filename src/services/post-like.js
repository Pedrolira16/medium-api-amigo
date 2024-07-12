import { Post, PostLike, User } from '../models';

class PostLikeService {
	async like(filter) {
		const message = 'You already liked this post';

		const hasLike = await PostLike.findOne({
			where: {
				post_id: filter.id,
				user_id: filter.user_id,
				is_deleted: false
			},
		});

		if (hasLike) {
			throw new Error(message);
		}

		const transaction = await Post.sequelize.transaction();

		try {
			await Promise.all([
				await PostLike.create({
					post_id: filter.id,
					user_id: filter.user_id
				}, { transaction }),
				await Post.increment('total_likes', {
					where: {
						id: filter.id
					},
					by: 1,
					transaction
				})
			])

			await transaction.commit();

			return true;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	};

	async dislike(filter) {
		const message = 'You didnt like this post';
		
		const hasLike = await PostLike.findOne({
			where: {
				post_id: filter.id,
				user_id: filter.user_id,
				is_deleted: false
			},
		});

		if (!hasLike) {
			throw new Error(message);
		}

		const transaction = await Post.sequelize.transaction();

		try {
			await Promise.all([
				PostLike.update({
					is_deleted: true
				}, {
					where: {
						post_id: filter.id,
						user_id: filter.user_id,
						is_deleted: false
					},
					transaction
				}),
				Post.decrement('total_likes', {
					where: {
						id: filter.id
					},
					by: 1,
					transaction
				})
			]);

			await transaction.commit();

			return true;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	};
}
export default PostLikeService;