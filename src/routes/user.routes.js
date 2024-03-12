import { Router } from 'express'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { authRequired } from '../middlewares/verifyToken.middleware.js'
import { newUserSchema } from '../schemas/user.schema.js'
import { registerNewUser, manyUser, oneUser, updateUser, disableUser, deleteUser } from '../controllers/user.controller.js'

const router = Router()

// crear validador de rol
router.post('/RegisterNewUser', authRequired, validateSchema(newUserSchema), registerNewUser)
router.put('/disableUser/:id', authRequired, disableUser)
router.get('/Users', authRequired, manyUser)

// acciones shared (Administrador y normalUser)
router.get('/oneUser/:id', authRequired, oneUser)
router.delete('/deleteUser/:id', authRequired, deleteUser)
router.put('/UpdateUser/:id', authRequired, updateUser)

export default router