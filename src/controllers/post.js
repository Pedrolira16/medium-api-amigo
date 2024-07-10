import Basecontroller from './base';
import PostService from '../services/post';

class PostController extends Basecontroller {
	constructor() {
		super();
		this.postService = new PostService();
		this.bindActions(['create','list']);
	}

	async create(req, res) {
		try {
			const response = await this.postService.create({
				...req.data,
				user_id: req.userId
			});
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}; 

	async list(req,res){
		try {
			const response = await this.postService.list({
				...req.filter,
				loggedUserId: req.userId
			});
			
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async remove(req,res){
		try {
			const response = await this.postService.remove({
				...req.data,
				user_id: req.userId
			});
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
export default PostController;