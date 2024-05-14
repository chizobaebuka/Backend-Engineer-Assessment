import { z } from 'zod';
import { PackageStatus } from '../interface/package.interface';

// export const createPackageSchema = z.object({
//     name: z.string(),
//     status: z.string(),
//     pickupDate: z.date(),
//     userId: z.string().uuid(), // Assuming userId is a UUID string
// });

export const createPackageSchema = z.object({
    name: z.string(),
    status: z.enum([
        PackageStatus.SentOut,
        PackageStatus.InTransit,
        PackageStatus.PendingDelivery,
        PackageStatus.OutForDelivery,
        PackageStatus.Delivered,
        PackageStatus.AvailableForPickup,
        PackageStatus.Delayed,
        PackageStatus.Closed
    ]),
    pickupDate: z.date().or(z.string()),
});