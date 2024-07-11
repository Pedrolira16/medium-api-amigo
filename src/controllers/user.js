import BaseController from "./base.js";
import UserService from "../services/user.js";

class UserController extends BaseController {
	constructor() {
		super();

		this.userService = new UserService();

		this.bindActions(["login", "create"]);
	}

	async login(req, res) {
		try {
			const response = await this.userService.login({
				...req.data,
			});

			this.successHandler(response, res);

		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
	async create(req, res) {
		try {
			const response = await this.userService.create({
				...req.data,
			});

			this.successHandler(response, res);
			
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
export default UserController; 