import userController from "../controller/userController";
import validate from "../helpers/validate";
import { createUserSchema, loginUserSchema, updateUserSchema } from "../schema/userSchema";
import BaseRoutes from "./base/BaseRouter";


class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post("/", validate(createUserSchema), userController.createUser),
        this.router.post("/login", userController.loginUser),
        this.router.post("/logout", userController.logoutUser),
        this.router.patch("/:id", validate(updateUserSchema), userController.updateUser),
        this.router.delete("/:id", userController.deleteUser),
        this.router.get("/", userController.findAllUsers),
        this.router.get("/:id", userController.findUserById)
    }
}

export default new UserRoutes().router;