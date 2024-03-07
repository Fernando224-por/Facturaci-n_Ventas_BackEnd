import { createTransport } from "nodemailer"
import { nodemailer_password, nodemailer_User } from "../../config.js"

export const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: nodemailer_User,
    pass: nodemailer_password
  }
})