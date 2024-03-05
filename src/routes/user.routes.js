import { Router } from 'express'
import { registNewUser } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', registNewUser)

export default router