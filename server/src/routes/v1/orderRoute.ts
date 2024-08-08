import express, { Router } from 'express'
import orderController from '~/controllers/orderController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import orderValidation from '~/validations/orderValidation'

const router: Router = express.Router()

router.post('/', [verifyToken, orderValidation.createOrder], orderController.createOrder)
router.get('/', [verifyToken, isAdmin], orderController.getOrders)
router.get('/:orderId', verifyToken, orderController.getOrderDetails)
router.put(
  '/:orderId/status',
  [verifyToken, isAdmin, orderValidation.updateOrderStatus],
  orderController.updateOrderStatus
)

export default router
