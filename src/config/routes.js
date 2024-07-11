import { Router } from 'express';
import UserRoutes from '../routes/user.js';
import PostRoutes from '../routes/post.js';

export default class Routes {
	constructor() {
		this.routes = new Router();
		this.userRoutes = new UserRoutes();
		this.postRoutes = new PostRoutes();
	}

	setup() {
		this.routes.use('/users', this.userRoutes.setup());
		this.routes.use('/posts',this.postRoutes.setup());

		return this.routes;
	}
}