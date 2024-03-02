import auth from '../../services/admin/auth.js';


class AdminAuth {
    constructor() {
        return {
            login: this.login.bind(this),
            createAdmin: this.createAdmin.bind(this),
            // logout: this.logout.bind(this),
            deleteUser: this.deleteUser.bind(this),
        }
    }

    async createAdmin(req, res, next) {
        try {
            const admin = await auth.createUser(req.body);
            admin.password = undefined;
            return res.status(200).json({
                message: 'admin create',
                data: admin
            })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            let user = await auth.authenticate(req.body);
            let token = await auth.createToken(user);
            user.password = undefined;
            return res.status(200).json({
                token: token,
                role: user.role,
                user
            });
        } catch (e) {
            next(e)
        }
    }
    async deleteUser(req, res, next) {
        try {
            await auth.deleteUser(req.params);
            res.status(200).json({
                message: 'user deleted'
            })
        } catch (error) {
            next(error);
        }
    }
    // async logout(req, res, next) {
    //     try {
    //         const { id: adminId } = req.admin;
    //         await redis.delete(adminId);
    //         return res.status(200).json({
    //             message: 'Successfully logged Out'
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

   

}

export default new AdminAuth();