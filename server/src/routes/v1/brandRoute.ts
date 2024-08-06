import express, { Router } from 'express'
import upload from '~/config/cloudinary'
import brandController from '~/controllers/brandController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import brandValidation from '~/validations/brandValidation'

const router: Router = express.Router()

router.get('/', brandController.getBrands)
router.get('/:slug', brandController.getBrandBySlug)
router.post(
  '/',
  [verifyToken, isAdmin, upload.single('image'), brandValidation.createBrand],
  brandController.creatBrand
)
router.put(
  '/:slug',
  [verifyToken, isAdmin, upload.single('image'), brandValidation.updateBrand],
  brandController.updateBrand
)
router.delete('/:slug', [verifyToken, isAdmin], brandController.deleteBrand)

export default router
