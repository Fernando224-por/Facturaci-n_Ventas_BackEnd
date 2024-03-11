import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { authRequired } from '../middlewares/verifyToken.middleware.js'
import { newUserSchema, newLoginSchema, codeSchema, newPasswordSchema } from '../schemas/auth.schema.js'
import { registNewUser, logIn, logOut, recoveryPassword, verifyCodePassword, changePassword, verifyToken } from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', validateSchema(newUserSchema), registNewUser)
router.post('/logIn', validateSchema(newLoginSchema), logIn)
router.get('/verify', verifyToken)

router.post('/recoveyPass', recoveryPassword)
router.post('/verifyCode', validateSchema(codeSchema), verifyCodePassword)
router.post('/passChange', validateSchema(newPasswordSchema), changePassword)


router.post('/logout', authRequired, logOut)


export default router