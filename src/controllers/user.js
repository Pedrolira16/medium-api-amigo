import BaseController from "./base.js";
import UserService from "../services/user.js";

class UserController extends BaseController {
    constructor() {
        super();

        this.userService = new UserService(); 

        this.bindActions(["login", "create"]);
    }

    async login(req, res) {
        const { email, password } = req.data;
        try {
            const response = await this.userService.login({
                email,  
                password,
            });
            
            this.successHandler(response, res);

        } catch (error) {
            this.errorHandler(error, req, res);
        }
    }
    async create(req, res) {
        const { name, email, password } = req.data;

        try {
            const response = await this.userService.create({
                name,
                email,
                password,
            });
            this.successHandler(response, res);
        } catch (error) {
            this.errorHandler(error, req, res); 
        }
    }
}

export default UserController; 