import { createTransport } from "nodemailer"
import { nodemailer_password } from "../../config.js"

export const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: 'andresfernandoxd1591@gmail.com',
    pass: nodemailer_password
  }
})