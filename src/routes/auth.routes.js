import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { authRequired } from '../middlewares/verifyToken.middleware.js'
import { newUserSchema, newLoginSchema } from '../schemas/User.schema.js'
import { registNewUser, logOut, logIn, verifyToken , sendEmail} from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', validateSchema(newUserSchema), registNewUser)
router.post('/logIn', validateSchema(newLoginSchema), logIn)
router.get('/verify', verifyToken)
router.post('/sendMail', sendEmail)
router.post('/logout', authRequired, logOut)


export default router