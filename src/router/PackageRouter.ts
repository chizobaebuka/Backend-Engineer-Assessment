import express from 'express';
import packageController from '../controller/packageController';
import validate from '../helpers/validate';
import { createPackageSchema } from '../schema/packageSchema';
import BaseRoutes from './base/BaseRouter';
import { authorizationMiddleware } from '../middleware/authenticateUser'; // Import your authentication middleware here

class PackageRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/', authorizationMiddleware, packageController.submitPackage);
        this.router.get('/:id', authorizationMiddleware, packageController.getPackageById); 
        this.router.get('/', authorizationMiddleware, packageController.getAllPackages);
        this.router.get('/userpackages/:userId', authorizationMiddleware, packageController.getAllPackagesByUserId);
        this.router.put('/update-status/:id', authorizationMiddleware, packageController.getPackageToUpdateById);

    }
}

export default new PackageRoutes().router;
