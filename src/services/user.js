import { User } from "../models/index";
import AuthUtils, { hashPassword } from "../utils/auth"; 

class UserService {
    async create(user) {
        const transaction = await User.sequelize.transaction();
        try {
            user.password = await hashPassword(user.password);
            const newUser = await User.create(user, { transaction });
            await transaction.commit();
            return newUser;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };

    async login(data){
    
        let user = await User.findOne({ where: { email: data.email } });
    
        if (!user) {
            user = {
                email: 'fakeemail@blalbla.com',
                password:'fakepassword1234'
            };
        }

        const isValid = await AuthUtils.isPasswordValid(data.password, user.password);
    
        if (!isValid) {
            throw new Error("Email ou senha incorretos");
        }
        
        return {
            user : {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: AuthUtils.generateToken({ id: user.id }),
        };
    }
}
export default UserService;