import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { newUserSchema } from '../schemas/User.schema.js'
import { registNewUser } from '../controllers/user.controller.js'

const router = Router()

router.post('/register', validateSchema(newUserSchema), registNewUser)

export default router