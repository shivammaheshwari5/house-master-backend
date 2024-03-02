import models  from '../../models/index.js';
import {hashPassword} from '../../utilities/helper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../config/app.js';
import aes256 from 'aes256';


const User = models['User'];

class AdminAuthService {
    constructor() {
        return {
            authenticate: this.authenticate.bind(this),
            createToken: this.createToken.bind(this),
            createUser: this.createUser.bind(this),
            deleteUser: this.deleteUser.bind(this),
        }
    }

    async authenticate({ email, password }) {
        try {
            let user = await User.findOne({
                email
            });
            if (!user) {
                this._throwException('Invalid Credentials');
            }
            if (user.role !== 'admin') {
                this._throwException(`You don't have an admin rights.`);
            }
            const res = await bcrypt.compare(password, user.password);
            if (res) {
                return user;
            } else {
                this._throwException('Invalid Credentials');
            }
        } catch (e) {
            throw (e)
        }
    };

    async createToken(user) {
        try {
            const encryptedKey = app.encryptionKey;
            const { _id, role } = user;
            let obj = {};
            obj.id = await aes256.encrypt(encryptedKey, _id.toString());
            obj.role = await aes256.encrypt(encryptedKey, role.toString());
            const token = jwt.sign(obj, app.superSecretForAdmin, {
                expiresIn: 60 * 60 * 12
            });
            return token;
        } catch (e) {
            throw (e)
        }
    }

    async createUser({ name, gender, phone_number, email, password }, role = 'admin') {
        try {
            password = await hashPassword(password)
            return await User.create({
                email,
                password,
                role,
                phone_number,
                name,
                gender
            });
        } catch (e) {
            throw (e)
        }
    }

    async deleteUser({ userId }) {
        try {
            await User.deleteOne({ _id: userId });
            return true;
        } catch (error) {
            throw (error)
        }
    }
    _throwException(message) {
        throw ({
            name: "house",
            code: 401,
            message
        })
    }

    _randomCodeGenerator() {
        return Math.floor(1000 + Math.random() * 9000);
    }
}

export default new AdminAuthService();