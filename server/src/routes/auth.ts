import express, { Request, Response, Router } from 'express'
import User from '~/models/user'

const router: Router = express.Router()

interface IRegisterBody {
  name: string
  email: string
  mobile: string
  password: string
}

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, mobile, password } = req.body as IRegisterBody
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Missings input.'
    })
  }

  try {
    const registerRes = await User.create(req.body)
    return res.status(200).json({
      message: 'Register is successfully',
      data: registerRes
    })
  } catch (error) {
    console.log('🚀error---->', error)
  }
})

export default router
