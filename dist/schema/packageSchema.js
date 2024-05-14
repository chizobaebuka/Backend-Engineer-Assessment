"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackageSchema = void 0;
const zod_1 = require("zod");
const package_interface_1 = require("../interface/package.interface");
// export const createPackageSchema = z.object({
//     name: z.string(),
//     status: z.string(),
//     pickupDate: z.date(),
//     userId: z.string().uuid(), // Assuming userId is a UUID string
// });
exports.createPackageSchema = zod_1.z.object({
    name: zod_1.z.string(),
    status: zod_1.z.enum([
        package_interface_1.PackageStatus.SentOut,
        package_interface_1.PackageStatus.InTransit,
        package_interface_1.PackageStatus.PendingDelivery,
        package_interface_1.PackageStatus.OutForDelivery,
        package_interface_1.PackageStatus.Delivered,
        package_interface_1.PackageStatus.AvailableForPickup,
        package_interface_1.PackageStatus.Delayed,
        package_interface_1.PackageStatus.Closed
    ]),
    pickupDate: zod_1.z.date().or(zod_1.z.string()),
});
//# sourceMappingURL=packageSchema.js.map