import express, { Router } from 'express'
import blogController from '~/controllers/blogController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import blogValidation from '~/validations/blogValidation'

const router: Router = express.Router()

// Get Blog Details
router.get('/:slug', blogController.getBlogBySlug)

// Create Blog
router.post('/', [verifyToken, isAdmin, blogValidation.createBlog], blogController.createBlog)

export default router
