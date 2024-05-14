import { Model, Table, Column, DataType, BelongsTo, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { User } from "./user";

@Table({
  tableName: "Packages",
  timestamps: true,
})
export class Package extends Model {
  public static PACKAGE_ID = "id" as string;
  public static PACKAGE_NAME = "package_name" as string;
  public static PACKAGE_STATUS = "status" as string;
  public static PACKAGE_PICKUP_DATE = "pickupDate" as string;
  public static PACKAGE_USER_ID = "userId" as string;

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    field: Package.PACKAGE_ID, 
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: Package.PACKAGE_USER_ID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user!: User;


  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: Package.PACKAGE_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: Package.PACKAGE_STATUS,
  })
  status!: string;

  @Column({
    type: DataType.DATE, 
    allowNull: false,
    field: Package.PACKAGE_PICKUP_DATE,
  })
  pickupDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}
