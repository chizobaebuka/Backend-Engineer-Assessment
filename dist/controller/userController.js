"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../models/user");
const userRepo_1 = require("../repository/userRepo");
const dotenv = __importStar(require("dotenv"));
const constants_1 = require("../constants");
dotenv.config();
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                const newUser = new user_1.User();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = hashedPassword;
                newUser.dateOfBirth = req.body.dateOfBirth;
                newUser.country = req.body.country;
                yield new userRepo_1.UserRepo().save(newUser);
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({ message: 'User created successfully', data: { user: newUser } });
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userRepo = new userRepo_1.UserRepo();
                const loginResult = yield userRepo.login(email, password);
                res.cookie('accessToken', loginResult.token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
                res.setHeader('Authorization', `Bearer ${loginResult.token}`);
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'Login successful',
                    user: loginResult.user,
                    token: loginResult.token,
                });
            }
            catch (error) {
                res.status(constants_1.HTTP_STATUS_CODE.UNAUTHORIZED).json({ message: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params["id"];
                const user = yield new userRepo_1.UserRepo().delete(id);
                if (!user) {
                    res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
                    return;
                }
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'User deleted successfully',
                    data: user,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    findAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield new userRepo_1.UserRepo().findAll();
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'Users retrieved successfully',
                    data: users,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error retrieving users:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params["id"];
                // const { id } = req.params;
                const user = yield new userRepo_1.UserRepo().findById(id);
                if (!user) {
                    res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
                    return;
                }
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'User retrieved successfully',
                    data: user,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS,
                });
            }
            catch (error) {
                console.error('Error retrieving user:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password, dateOfBirth, country } = req.body;
            try {
                const [affectedCount, updatedUsers] = yield user_1.User.update({
                    name: name,
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                    country: country
                }, { where: { id: id }, returning: true });
                if (affectedCount === 0 || !updatedUsers || updatedUsers.length === 0) {
                    res.status(constants_1.HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'User not found', status: constants_1.HTTP_STATUS_CODE.NOT_FOUND });
                    return;
                }
                const updatedUser = updatedUsers[0];
                yield new userRepo_1.UserRepo().update(updatedUser);
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({
                    message: 'User updated successfully',
                    data: updatedUser,
                    status: constants_1.HTTP_STATUS_CODE.SUCCESS
                });
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('accessToken');
                // localStorage.removeItem('accessToken');
                res.status(constants_1.HTTP_STATUS_CODE.SUCCESS).json({ message: 'Logout successful' });
            }
            catch (error) {
                console.error('Error logging out user:', error);
                res.status(constants_1.HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new UserController;
//# sourceMappingURL=userController.js.map