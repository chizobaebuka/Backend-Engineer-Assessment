import { Sequelize } from "sequelize-typescript";
import { db_host, db_port, db_name, db_user, db_password } from './config';
import * as dotenv from 'dotenv';
import { User } from "./models/user";
import { Package } from "./models/package";

dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.DB_NAME || db_name;
    private POSTGRES_HOST = process.env.DB_HOST || db_host;
    private POSTGRES_PORT = process.env.DB_PORT as unknown as number || db_port;
    private POSTGRES_USER = process.env.DB_USER || db_user;
    private POSTGRES_PASSWORD = process.env.DB_PASSWORD || db_password;

    constructor() {
        this.connectToPostgreSQL();
    }

    private async connectToPostgreSQL() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT ,
            dialect: 'postgres',
            models: [User, Package],
        });

        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            console.log('Models have been synchronized with the database.');
        } catch (error) {
            console.log('Unable to connect to the database:', error);
        }
    }

    async closeConnection(): Promise<void> {
        try {
            await this.sequelize?.close();
        } catch (error) {
            console.error("Error closing database connection:", error);
            throw new Error("Failed to close database connection");
        }
    }
}

export default Database;
