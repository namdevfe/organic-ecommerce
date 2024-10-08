import { NextFunction, Request, Response } from 'express'
import brandService from '~/services/brandService'

const creatBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageFileData = req.file
    if (imageFileData) {
      const createdBrand = await brandService.createBrand(req.body, imageFileData)
      return res.json(createdBrand)
    }
  } catch (error) {
    next(error)
  }
}

const getBrandBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const brandDetails = await brandService.getBrandBySlug(slug)
    return res.json(brandDetails)
  } catch (error) {
    next(error)
  }
}

const getBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await brandService.getBrands(req.query)
    return res.json(brands)
  } catch (error) {
    next(error)
  }
}

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const imageFileData = req.file
    const updatedBrand = await brandService.updateBrand(slug, req.body, imageFileData)
    return res.json(updatedBrand)
  } catch (error) {
    next(error)
  }
}

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const deletedBrand = await brandService.deleteBrand(slug)
    return res.json(deletedBrand)
  } catch (error) {
    next(error)
  }
}

const brandController = {
  creatBrand,
  getBrandBySlug,
  getBrands,
  updateBrand,
  deleteBrand
}

export default brandController
