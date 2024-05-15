import { Response } from 'express';
import * as dotenv from 'dotenv';
import { Package } from '../models/package';
import { RequestExt } from '../middleware/authenticateUser';
import { createPackageSchema } from '../schema/packageSchema';
import { HTTP_STATUS_CODE } from '../constants';
import { v4 as uuidv4 } from "uuid";
import { PackageStatus } from '../interface/package.interface';
import { NewPackageRepo } from '../repository/packageRepo';
import cron from 'node-cron';

dotenv.config();

class PackageController {
    async submitPackage(req: RequestExt, res: Response) {
        const { _user: user, _userId: userId, ...rest } = req.body;
    
        const requestData = createPackageSchema.strict().safeParse(rest);
        if (!requestData.success) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                message: requestData.error.issues
            });
        }
    
        const _data = requestData.data;
        const packageId = uuidv4();
    
        try {
            const statusValue = _data.status as PackageStatus;
            if (!(statusValue in PackageStatus)) {
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: 'Invalid status value. Status should be one of: SentOut, InTransit, Pending, Received'
                });
            }
    
            const newPackage = {
                id: packageId,
                name: _data.name,
                status: statusValue,
                pickupDate: _data.pickupDate,
                userId: userId,
            }
    
            const createdPackage = await Package.create(newPackage);
            return res.status(HTTP_STATUS_CODE.CREATED).json({
                message: 'Package submitted successfully',
                data: createdPackage,
                status: HTTP_STATUS_CODE.CREATED,
            });
        } catch (error) {
            console.error('Error submitting package:', error);
            await Package.destroy({ where: { id: packageId } })
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
        }
    }

    async getPackageById(req: RequestExt, res: Response) {
        try {
            const packageId = req.params.id; 
            if (!packageId) {
                return res.status(400).json({ message: 'Package ID is missing in request' });
            }
    
            const _package = await new NewPackageRepo().findById(packageId);
            if (!_package) {
                return res.status(404).json({ message: 'Package not found' });
            }
    
            return res.status(200).json({
                message: 'Package retrieved successfully',
                data: _package,
                status: 200,
            });
        } catch (error) {
            console.error('Error retrieving package:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllPackages(req: RequestExt, res: Response) {
        try {
            const _packages = await new NewPackageRepo().findAll();
            if(!_packages) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Packages not found' });
            }
            return res.status(HTTP_STATUS_CODE.SUCCESS).json({
                message: 'Packages retrieved successfully',
                data: _packages,
                status: HTTP_STATUS_CODE.SUCCESS,
            });
        } catch (error) {
            console.error('Error getting all package:', error);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
        }
    };

    async getAllPackagesByUserId(req: RequestExt, res: Response) {
        try {
            const userId = req.params.userId;
            if (!userId) {
              return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'User ID is missing in request' });
            }
        
            const packages = await new NewPackageRepo().getPackagesByUserId(userId);
            if (!packages || packages.length === 0) {
              return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'No packages found for the user' });
            }
        
            return res.status(HTTP_STATUS_CODE.SUCCESS).json({
              message: 'Packages retrieved successfully',
              data: packages,
              status: HTTP_STATUS_CODE.SUCCESS,
            });
          } catch (error) {
            console.error('Error retrieving packages:', error);
            return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
          }
    }

    async getPackageToUpdateById(req: RequestExt, res: Response) {
        try {
            const packageId = req.params.id; 
            if (!packageId) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Package ID is missing in request' });
            }
            const _package = await new NewPackageRepo().findById(packageId);
            if (!_package) {
                return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ message: 'Package not found' });
            }
            
            cron.schedule('*/2 * * * *', async () => {
                await new NewPackageRepo().updatePackageStatus(packageId);
            });              

            return res.status(HTTP_STATUS_CODE.SUCCESS).json({
                message: 'Package to update retrieved successfully and initiated the automated status update job',
                data: _package,
                status: HTTP_STATUS_CODE.SUCCESS,
            });

        } catch (error) {
            console.error('Error retrieving package:', error);
            return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({ message: 'Internal server error' });
        }
    }
    
}

export default new PackageController;