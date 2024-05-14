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
exports.UserRepo = void 0;
const user_1 = require("../models/user");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const db = __importStar(require("../config"));
class UserRepo {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.User.create({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    dateOfBirth: user.dateOfBirth,
                    country: user.country,
                });
                yield newUser.save();
                return;
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err);
                    throw new Error("Failed to create user: " + err.message);
                }
                else {
                    console.log(err);
                    throw new Error("Failed to create user: Unknown error occurred");
                }
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.User.findOne({ where: { email } });
                if (!existingUser) {
                    throw new Error("User not found with that email: " + email);
                }
                const passwordMatch = yield bcrypt.compare(password, existingUser.password);
                if (!passwordMatch) {
                    throw new Error("Incorrect password");
                }
                const token = jwt.sign({ id: existingUser.id }, db.JWT_SECRET, { expiresIn: '1h' });
                return {
                    user: existingUser,
                    token: token,
                };
            }
            catch (error) {
                throw new Error("Failed to login user: " + error.message);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.User.findOne({ where: { id: user.id } });
                if (!newUser) {
                    throw new Error("User not found");
                }
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.password = user.password;
                newUser.dateOfBirth = user.dateOfBirth;
                newUser.country = user.country;
                yield newUser.save();
                user.save();
                return newUser;
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err);
                    throw new Error("Failed to update user: " + err.message);
                }
                else {
                    console.log(err);
                    throw new Error("Failed to update user: Unknown error occurred");
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
                console.error("Error retrieving users:", error);
                throw new Error("Failed to retrieve users");
            }
        });
    }
    findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ where: { id: user_id } });
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                console.error("Error retrieving user:", error);
                throw new Error("Failed to retrieve user by id:");
            }
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ where: { id: user_id } });
                if (!user) {
                    throw new Error("User not found");
                }
                yield user.destroy();
                return user;
            }
            catch (error) {
                console.error("Error deleting user:", error);
                throw new Error("Failed to delete user");
            }
        });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=userRepo.js.map