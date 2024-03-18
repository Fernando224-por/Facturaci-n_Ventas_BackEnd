import { Router } from 'express'
import { newRoleSchema } from '../schemas/role.schema.js'
import { validateSchema } from '../middlewares/validator.middlewares.js'
import { newRole, getAllRoles, getOneRole, modifyRole, disbleRole } from '../controllers/role.controller.js'

const router = Router()

router.post('/newRole', validateSchema(newRoleSchema), newRole)
router.get('/getRoles', getAllRoles)
router.get('/getRol/:id', getOneRole)
router.put('/updateRole/:id', modifyRole)
router.delete('/deleteRole/:id', disbleRole)

export default router