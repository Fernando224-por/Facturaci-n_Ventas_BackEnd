import { z } from 'zod'

export const newRoleSchema = z.object({
  nameRole: z.string({
    required_error: 'Nombre de el rol es requerido'
  }).min(3, {
    message: 'El nombre del rol debe tener mas de 3 caracteres de longitud'
  }),
  resumeRole: z.string({
    required_error: 'La descripción de el rol es requerido'
  }).min(6, {
    message: 'la descripcion del rol debe tener mas de 6 caracteres de longitud'
  })
})