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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const userRepo_1 = require("../repository/userRepo");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, dateOfBirth, country } = req.body;
            try {
                const newUser = new user_1.default();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.dateOfBirth = req.body.dateOfBirth;
                newUser.country = req.body.country;
                const userRepo = new userRepo_1.UserRepo();
                yield userRepo.save(newUser);
            }
            catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield new userRepo_1.UserRepo().delete(parseInt(id));
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    findAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield new userRepo_1.UserRepo().findAll();
                res.status(200).json({
                    message: 'Users retrieved successfully',
                    data: users,
                    status: 200,
                });
            }
            catch (error) {
                console.error('Error retrieving users:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    findUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield new userRepo_1.UserRepo().findById(parseInt(id));
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(200).json({
                    message: 'User retrieved successfully',
                    data: user,
                    status: 200,
                });
            }
            catch (error) {
                console.error('Error retrieving user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password, dateOfBirth, country } = req.body;
            try {
                const updatedUser = new user_1.default();
                updatedUser.id = parseInt(id);
                updatedUser.name = name;
                updatedUser.email = email;
                updatedUser.password = password;
                updatedUser.dateOfBirth = dateOfBirth;
                updatedUser.country = country;
                const user = yield new userRepo_1.UserRepo().update(updatedUser);
                yield user.save();
                res.json({ message: 'User updated successfully', data: user, status: 200 });
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new UserController;
//# sourceMappingURL=userController.js.map