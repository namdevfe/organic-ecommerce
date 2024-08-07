import express, { Router } from 'express'
import cartController from '~/controllers/cartController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import cartValidation from '~/validations/cartValidation'

const router: Router = express.Router()

router.get('/', verifyToken, cartController.getCart)
router.post('/add-to-cart', [verifyToken, cartValidation.addToCart], cartController.addToCart)

export default router
