import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { authRequired } from '../middlewares/verifyToken.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { registerNewUser, updateUser, disableUser, deleteUser } from '../controllers/user.controller.js'

const router = Router()

// crear validador de rol
router.post('/RegisterNewUser', validateSchema(newUserSchema), registerNewUser)
router.put('/UpdateUser/:id', updateUser)
router.put('/disableUser/:id', disableUser)
router.delete('/deleteUser/:id', deleteUser)


export default router