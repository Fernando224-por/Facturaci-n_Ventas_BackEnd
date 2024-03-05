import { config } from 'dotenv'

config()

export const PORT = process.env.PORT
export const JWTKEY = process.env.JWTKEY
export const FRONT_URL = process.env.FRONT_URL