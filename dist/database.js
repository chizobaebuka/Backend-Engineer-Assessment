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
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const dotenv = __importStar(require("dotenv"));
const user_1 = require("./models/user");
const package_1 = require("./models/package");
dotenv.config();
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.DB_NAME || config_1.db_name;
        this.POSTGRES_HOST = process.env.DB_HOST || config_1.db_host;
        this.POSTGRES_PORT = parseInt(process.env.DB_PORT || config_1.db_port.toString(), 10);
        this.POSTGRES_USER = process.env.DB_USER || config_1.db_user;
        this.POSTGRES_PASSWORD = process.env.DB_PASSWORD || config_1.db_password;
        this.connectToPostgreSQL();
    }
    connectToPostgreSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Attempting to connect to PostgreSQL database...');
            console.log('Database:', this.POSTGRES_DB);
            console.log('Host:', this.POSTGRES_HOST);
            console.log('Port:', this.POSTGRES_PORT);
            console.log('User:', this.POSTGRES_USER);
            this.sequelize = new sequelize_typescript_1.Sequelize({
                database: this.POSTGRES_DB,
                username: this.POSTGRES_USER,
                password: this.POSTGRES_PASSWORD,
                host: this.POSTGRES_HOST,
                port: this.POSTGRES_PORT,
                dialect: 'postgres',
                models: [user_1.User, package_1.Package],
                logging: console.log,
            });
            try {
                yield this.sequelize.authenticate();
                console.log('Connection has been established successfully.');
                yield this.sequelize.sync();
                console.log('Models have been synchronized with the database.');
            }
            catch (error) {
                console.log('Unable to connect to the database:', error);
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                yield ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.close());
            }
            catch (error) {
                console.error("Error closing database connection:", error);
                throw new Error("Failed to close database connection");
            }
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map