"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const user_1 = require("../models/user");
class UserRepo {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.User.create({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    dateOfBirth: user.dateOfBirth,
                    country: user.country
                });
                return user;
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err);
                    throw new Error('Failed to create user: ' + err.message);
                }
                else {
                    // Handle other types of errors or unknown errors
                    console.log(err);
                    throw new Error('Failed to create user: Unknown error occurred');
                }
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.User.findOne({ where: { id: user.id } });
                if (!newUser) {
                    throw new Error('User not found');
                }
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.password = user.password;
                newUser.dateOfBirth = user.dateOfBirth;
                newUser.country = user.country;
                yield newUser.save();
                return newUser;
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err);
                    throw new Error('Failed to update user: ' + err.message);
                }
                else {
                    console.log(err);
                    throw new Error('Failed to update user: Unknown error occurred');
                }
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.User.findAll();
            }
            catch (error) {
                console.error('Error retrieving users:', error);
                throw new Error('Failed to retrieve users');
            }
        });
    }
    findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ where: { id: user_id } });
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                console.error('Error retrieving user:', error);
                throw new Error('Failed to retrieve user');
            }
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ where: { id: user_id } });
                if (!user) {
                    throw new Error('User not found');
                }
                yield user.destroy();
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Failed to delete user');
            }
        });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=userRepo.js.map