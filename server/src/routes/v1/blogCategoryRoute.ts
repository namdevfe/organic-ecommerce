import express, { Router } from 'express'
import blogCategoryController from '~/controllers/blogCategoryController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import blogCategoryValidation from '~/validations/blogCategoryValidation'

const router: Router = express.Router()

router.get('/:slug', blogCategoryController.getBlogCategoryBySlug)
router.get('/', blogCategoryController.getBlogCategories)

router.post(
  '/',
  [verifyToken, isAdmin, blogCategoryValidation.createBlogCategoryByAdmin],
  blogCategoryController.createBlogCategoryByAdmin
)
router.put(
  '/:blogCategoryId',
  [verifyToken, isAdmin, blogCategoryValidation.updateBlogCategoryByAdmin],
  blogCategoryController.updateBlogCategory
)

export default router
