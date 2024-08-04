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

const brandController = {
  creatBrand
}

export default brandController
