import { IPackage } from "./package.interface";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    country: string;
    packages: IPackage[];
}
