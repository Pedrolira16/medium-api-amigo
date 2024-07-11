import BaseRoutes from './base.js';
import UserController from '../controllers/user.js';
import SchemaValidator from '../utils/schemaValidator.js';
import userSchema from '../schema/user.js';

class UserRoutes extends BaseRoutes {
	constructor() {
		super();
		this.userController = new UserController();
	}

	setup() {
		this.router.post('/login', SchemaValidator.validate(userSchema.login), this.userController.login);
		this.router.post('/', SchemaValidator.validate(userSchema.create), this.userController.create);

		return this.router;
	}
}
export default UserRoutes;
