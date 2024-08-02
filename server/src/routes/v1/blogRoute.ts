import express, { Router } from 'express'
import blogController from '~/controllers/blogController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import blogValidation from '~/validations/blogValidation'

const router: Router = express.Router()

router.get('/:slug', blogController.getBlogBySlug)
router.get('/', blogController.getBlogs)
router.post('/', [verifyToken, isAdmin, blogValidation.createBlog], blogController.createBlog)
router.put('/:slug', [verifyToken, isAdmin, blogValidation.updateBlog], blogController.updateBlog)

export default router
