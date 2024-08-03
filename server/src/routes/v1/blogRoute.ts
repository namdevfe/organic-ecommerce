import express, { Router } from 'express'
import blogController from '~/controllers/blogController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import blogValidation from '~/validations/blogValidation'

const router: Router = express.Router()

router.get('/', blogController.getBlogs)
router.get('/:slug', blogController.getBlogBySlug)
router.post('/', [verifyToken, isAdmin, blogValidation.createBlog], blogController.createBlog)
router.put('/:slug', [verifyToken, isAdmin, blogValidation.updateBlog], blogController.updateBlog)
router.delete('/:slug', [verifyToken, isAdmin], blogController.deleteBlog)
router.put('/:slug/like', verifyToken, blogController.likeBlog)

export default router
