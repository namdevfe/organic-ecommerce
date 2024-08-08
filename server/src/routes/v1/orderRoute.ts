import express, { Router } from 'express'
import orderController from '~/controllers/orderController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import orderValidation from '~/validations/orderValidation'

const router: Router = express.Router()

router.post('/', [verifyToken, orderValidation.createOrder], orderController.createOrder)

export default router
