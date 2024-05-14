// import { Model, DataTypes, Sequelize } from "sequelize";
// import * as dotenv from 'dotenv';

// dotenv.config();

// const TABLE_NAME = "Users";

// class User extends Model {
//   static USER_MODEL_NAME = "Users";
//   static USER_TABLE_NAME = "Users";

//   id!: number;
//   name!: string;
//   email!: string;
//   password!: string;
//   dateOfBirth!: Date;
//   country!: string;

//   static initialize(sequelize: Sequelize) {
//     this.init(
//       {
//         id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//           allowNull: false,
//         },
//         name: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         email: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         password: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//         dateOfBirth: {
//           type: DataTypes.DATE,
//           allowNull: false,
//         },
//         country: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//         },
//       },
//       {
//         sequelize,
//         tableName: TABLE_NAME,
//         modelName: this.USER_MODEL_NAME,
//         timestamps: false,
//       }
//     );
//   }
// }

// export default User;


import { Model, Table, Column, DataType, HasMany, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Package } from "./package";

@Table({
  tableName: User.USER_TABLE_NAME,
  timestamps: false,
})
export class User extends Model {
  public static USER_TABLE_NAME = "Users" as string;
  public static USER_ID = "id" as string;
  public static USER_NAME = "name" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_PASSWORD = "password" as string;
  public static USER_DOB = "dateOfBirth" as string;
  public static USER_COUNTRY = "country" as string;

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: () => uuidv4(),
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_PASSWORD,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    field: User.USER_DOB,
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.STRING(255),
    field: User.USER_COUNTRY,
  })
  country!: string;

  @HasMany(() => Package)
  packages!: Package[];
}
