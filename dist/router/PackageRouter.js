"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageController_1 = __importDefault(require("../controller/packageController"));
const BaseRouter_1 = __importDefault(require("./base/BaseRouter"));
const authenticateUser_1 = require("../middleware/authenticateUser"); // Import your authentication middleware here
class PackageRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post('/', authenticateUser_1.authorizationMiddleware, packageController_1.default.submitPackage);
        this.router.get('/:id', authenticateUser_1.authorizationMiddleware, packageController_1.default.getPackageById);
        this.router.get('/', authenticateUser_1.authorizationMiddleware, packageController_1.default.getAllPackages);
        this.router.get('/userpackages/:userId', authenticateUser_1.authorizationMiddleware, packageController_1.default.getAllPackagesByUserId);
        this.router.put('/update-status/:id', authenticateUser_1.authorizationMiddleware, packageController_1.default.getPackageToUpdateById);
    }
}
exports.default = new PackageRoutes().router;
//# sourceMappingURL=PackageRouter.js.map