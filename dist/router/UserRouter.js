"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controller/userController"));
const validate_1 = __importDefault(require("../helpers/validate"));
const userSchema_1 = require("../schema/userSchema");
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
class UserRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/", (0, validate_1.default)(userSchema_1.createUserSchema), userController_1.default.createUser),
            this.router.post("/login", userController_1.default.loginUser),
            this.router.post("/logout", userController_1.default.logoutUser),
            this.router.patch("/:id", (0, validate_1.default)(userSchema_1.updateUserSchema), userController_1.default.updateUser),
            this.router.delete("/:id", userController_1.default.deleteUser),
            this.router.get("/", userController_1.default.findAllUsers),
            this.router.get("/:id", userController_1.default.findUserById);
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=UserRouter.js.map