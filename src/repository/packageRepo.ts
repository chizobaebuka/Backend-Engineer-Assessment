import { Package } from "../models/package";
import { PackageStatus } from "../interface/package.interface";
import { Op } from "sequelize";


interface iPackageRepo {
  findById(package_id: string): Promise<Package | null>;
  findAll(): Promise<Package[]>;
  getPackagesByUserId(userId: string): Promise<Package[]>;
  getPackageToUpdateById(package_id: string): Promise<Package>;
}

export class NewPackageRepo implements iPackageRepo {
    async findById(package_id: string): Promise<Package | null> {
        try {
            const _package = await Package.findOne({ where: { id: package_id } });
            if (!_package) {
                throw new Error("Package not found");
            }

            return _package;
        } catch (error) {
            console.error("Error retrieving package:", error);
            throw new Error("Failed to retrieve package by id:");
        } 
    };

    async findAll(): Promise<Package[]> {
        try {
            return await Package.findAll();
        } catch (error) {
            console.error("Error retrieving packages:", error);
            throw new Error("Failed to retrieve packages");
        }
    };

    async getPackagesByUserId(userId: string): Promise<Package[]> {
        try {
            return await Package.findAll({ where: { userId: userId } });
        } catch (error) {
            console.error("Error retrieving packages:", error);
            throw new Error("Failed to retrieve packages");
        }
    };

    async getPackageToUpdateById(packageId: string): Promise<Package> {
        try {
            const _package = await Package.findOne({
                where: {
                    id: packageId,
                    status: {
                        [Op.notIn]: [PackageStatus.Delivered, PackageStatus.AvailableForPickup]
                    }
                }
            });

            if (!_package) {
                throw new Error("Package not found");
            }

            return _package;
        } catch (error) {
            console.error("Error retrieving package:", error);
            throw new Error("Failed to retrieve package by id:");
        }
    }

    async updatePackageStatuss(packageId: string, status: PackageStatus): Promise<Package> {
        try {
            const _package = await Package.findOne({ where: { id: packageId } });
            if (!_package) {
                throw new Error("Package not found");
            }

            if (!(status in PackageStatus)) {
                throw new Error("Invalid package status");
            }

            switch (_package.status) {
                case PackageStatus.Delayed:
                    _package.status = PackageStatus.Delayed
                case PackageStatus.SentOut:
                    _package.status = PackageStatus.InTransit
                    break;
                case PackageStatus.InTransit:
                    _package.status = PackageStatus.PendingDelivery
                    break;
                case PackageStatus.PendingDelivery:
                    _package.status = PackageStatus.OutForDelivery
                    break;
                case PackageStatus.OutForDelivery:
                    _package.status = PackageStatus.Delivered
                    break;
                case PackageStatus.Delivered:
                    _package.status = PackageStatus.Closed
                    break;
                case PackageStatus.AvailableForPickup:
                    _package.status = PackageStatus.Closed
                    break;
                default:
                    break;
            }

            await _package.save();
            return _package;
        } catch (error) {
            console.error("Error updating package status:", error);
            throw new Error("Failed to update package status");
        }
    }

    async updatePackageStatus(packageId: string): Promise<void> {
        try {
            const packageToUpdate = await this.getPackageToUpdateById(packageId);
    
            if (!packageToUpdate) {
                throw new Error(`Package ${packageId} not found`);
            }
    
            const oldStatus = packageToUpdate.status;
            let newStatus;
    
            switch (packageToUpdate.status) {
                case PackageStatus.Delayed:
                    newStatus = PackageStatus.Delayed;
                    break;
                case PackageStatus.SentOut:
                    newStatus = PackageStatus.InTransit;
                    break;
                case PackageStatus.InTransit:
                    newStatus = PackageStatus.PendingDelivery;
                    break;
                case PackageStatus.PendingDelivery:
                    newStatus = PackageStatus.OutForDelivery;
                    break;
                case PackageStatus.OutForDelivery:
                    newStatus = PackageStatus.Delivered;
                    break;
                case PackageStatus.Delivered:
                    newStatus = PackageStatus.Closed;
                    break;
                case PackageStatus.AvailableForPickup:
                    newStatus = PackageStatus.Closed;
                    break;
                default:
                    newStatus = oldStatus;
                    break;
            }
    
            if (newStatus !== oldStatus) {
                packageToUpdate.status = newStatus;
                await packageToUpdate.save();
                console.log(`Package status updated successfully! Old status: ${oldStatus}, New status: ${newStatus}`);
            } else {
                console.log(`Package status remains the same: ${oldStatus}`);
            }
        } catch (error) {
            console.error('Error updating package status:', error);
        }
    }
    

    async getPackagesToUpdate(): Promise<Package[]> {
        try {
            return await Package.findAll({
                where: {
                    status: {
                        [Op.notIn]: [PackageStatus.Delivered, PackageStatus.AvailableForPickup]
                    }
                }
            });
        } catch (error) {
            console.error("Error retrieving packages to update:", error);
            throw new Error("Failed to retrieve packages to update");
        }
    }
}

