import express, { Router } from 'express'
import authController from '~/controllers/authController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import authValidation from '~/validations/authValidation'

const router: Router = express.Router()

router.post('/register', authValidation.register, authController.register)
router.post('/login', authValidation.login, authController.login)
router.post('/logout', authValidation.logout, authController.logout)
router.get('/profile', verifyToken, authController.getProfile)
router.post('/refresh-token', authValidation.refreshToken, authController.refreshToken)
router.post('/forgot-password', authValidation.forgotPassword, authController.forgotPassword)

export default router
