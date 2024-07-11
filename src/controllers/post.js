import Basecontroller from './base';
import PostService from '../services/post';

class PostController extends Basecontroller {
	constructor() {
		super();
		
		this.postService = new PostService();
		
		this.bindActions([
			"create",
			"list",
			"listById",
			"remove", 
			"update"
		]);
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

	async listById(req,res){
		try {
			const response = await this.postService.listById({
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
				...req.filter,
				user_id: req.userId
			});
			this.successHandler(response, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};

	async update(req,res){
		try {
			await this.postService.update({
				changes: req.data,
				filter: {
					...req.filter,
					user_id: req.userId
				},
			});
			this.successHandler(true, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
export default PostController;