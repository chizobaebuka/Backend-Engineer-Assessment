import { IUser } from "./user.interface";

export interface IPackage {
    id: number;
    name: string;
    pickupDate: Date;
    status: PackageStatus;
    userId: IUser;
}
  
export enum PackageStatus {
    SentOut = 'SentOut',
    InTransit = 'InTransit',
    PendingDelivery = 'PendingDelivery',
    OutForDelivery = 'OutForDelivery',
    Delivered = 'Delivered',
    AvailableForPickup = 'AvailableForPickup',
    Delayed = 'Delayed',
    Closed = 'Closed'
}
