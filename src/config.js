import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const JWTKEY = process.env.JWTKEY
export const FRONT_URL = process.env.FRONT_URL
export const nodemailer_password = process.env.nodemailer_password
export const nodemailer_User = process.env.nodemailer_User