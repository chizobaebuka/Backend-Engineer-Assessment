"use strict";
// import * as dotenv from 'dotenv';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_PORT = exports.JWT_SECRET = exports.db_password = exports.db_user = exports.db_name = exports.db_port = exports.db_host = void 0;
// dotenv.config()
// export const port = Number(process.env.API_PORT);
// export const db_host = String(process.env.DB_HOST);
// export const db_port = Number(process.env.DB_PORT);
// export const db_name = String(process.env.DB_NAME);
// export const db_user = String(process.env.DB_USER);
// export const db_password = String(process.env.DB_PASSWORD);
// export const JWT_SECRET = String(process.env.JWT_SECRET);
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.db_host = process.env.DB_HOST;
exports.db_port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
exports.db_name = process.env.DB_NAME;
exports.db_user = process.env.DB_USER;
exports.db_password = process.env.DB_PASSWORD;
exports.JWT_SECRET = String(process.env.JWT_SECRET);
exports.API_PORT = process.env.API_PORT ? parseInt(process.env.API_PORT, 10) : 3000;
//# sourceMappingURL=config.js.map