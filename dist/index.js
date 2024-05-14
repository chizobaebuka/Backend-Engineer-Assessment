"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const PackageRouter_1 = __importDefault(require("./router/PackageRouter"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("welcome home");
        });
        this.app.use("/api/v1/users", UserRouter_1.default);
        this.app.use('/api/v1/packages', PackageRouter_1.default);
    }
}
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;
const app = new App().app;
app.listen(port, () => {
    console.log(`✅ Server started successfully, running on port: ${port}`);
});
//# sourceMappingURL=index.js.map