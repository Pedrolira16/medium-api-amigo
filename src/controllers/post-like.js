import BaseController from "./base";
import PostLikeService from "../services/post-like";

class PostLikeController extends BaseController {
	constructor() {
		super();

		this.postLikeService = new PostLikeService();

		this.bindActions([
			"like",
			"dislike"
		]);
	}

	async like(req, res) {
		try {
			const response = await this.postLikeService.like({
				...req.filter,
				user_id: req.userId
			});
			
			this.successHandler(response, res);
			
		}catch (error) {
			this.errorHandler(error, req, res);
		}
	};
	
	async dislike(req, res) {
		try {
			const response = await this.postLikeService.dislike({
				...req.filter,
				user_id: req.userId
			});

			this.successHandler(response, res);

		} catch (error) {
			this.errorHandler(error, req, res);
		}
	};
}
export default PostLikeController;