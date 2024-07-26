import express, { Router } from 'express'
import { ADMIN_URL_ENDPOINT } from '~/constants/baseUrl'
import authController from '~/controllers/authController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import authValidation from '~/validations/authValidation'

const router: Router = express.Router()

router.post('/register', authValidation.register, authController.register)
router.post('/login', authValidation.login, authController.login)
router.post('/logout', authValidation.logout, authController.logout)
router.post('/refresh-token', authValidation.refreshToken, authController.refreshToken)
router.put('/forgot-password', authValidation.forgotPassword, authController.forgotPassword)
router.put('/reset-password', authValidation.resetPassword, authController.resetPassword)
router.get('/profile', verifyToken, authController.getProfile)
router.put('/profile', [verifyToken, authValidation.updateProfile], authController.updateProfile)

// ADMIN ROUTES
router.get(`${ADMIN_URL_ENDPOINT}/users`, [verifyToken, isAdmin], authController.getListUsersByAdmin)
router.put(
  `${ADMIN_URL_ENDPOINT}/users/:uid`,
  [verifyToken, isAdmin, authValidation.updateUserByAdmin],
  authController.updateUserByAdmin
)

export default router
