import nodemailer from 'nodemailer'
import env from '~/config/environments'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: env.EMAIL_ACCOUNT,
    pass: env.EMAIL_APP_PASSWORD
  }
})

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (email: string, html: string) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"organic-ecommerce" <no-reply:organic-ecommerce.com>', // sender address
    to: email, // list of receivers
    subject: 'Forgot Password', // Subject line
    html // html body
  })

  return info
}

export default sendMail
