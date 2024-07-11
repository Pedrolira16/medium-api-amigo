import BaseRoutes from "./base";
import PostController from "../controllers/post";
import PostLikeController from "../controllers/post-like";
import Authenticator from "../middlewares/auth";
import SchemaValidator from "../utils/schemaValidator";
import PostSchemas from "../schema/post.js";
import PostLikeSchemas from "../schema/post-like.js";

class PostRoutes extends BaseRoutes {
	constructor() {
		super();
		this.postController = new PostController();;
		this.postLikeController = new PostLikeController();
	}

	setup() {
		this.router.post('/', Authenticator.verifyToken, SchemaValidator.validate(PostSchemas.create), this.postController.create);
		this.router.get('/', Authenticator.getToken, SchemaValidator.validate(PostSchemas.list), this.postController.list);
		this.router.get('/:id', Authenticator.getToken, SchemaValidator.validate(PostSchemas.listById), this.postController.listById);
		this.router.delete('/:id', Authenticator.getToken, SchemaValidator.validate(PostSchemas.remove), this.postController.remove);
		this.router.put('/:id', Authenticator.getToken, SchemaValidator.validate(PostSchemas.update), this.postController.update);
		this.router.post('/:id/like', Authenticator.getToken, SchemaValidator.validate(PostLikeSchemas.like), this.postLikeController.like);
		this.router.post('/:id/dislike', Authenticator.getToken, SchemaValidator.validate(PostLikeSchemas.like), this.postLikeController.dislike);
		
		return this.router;
	}
}
export default PostRoutes;