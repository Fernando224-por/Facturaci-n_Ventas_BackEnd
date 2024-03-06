import { z } from 'zod'
export const newUserSchema = z.object({
  name: z.string({
    required_error: 'Nombre es requerido'
  }),
  email: z.string({
    required_error: 'Email es requerido'
  }).email({
    message: 'El correo suministrado no es valido'
  }).endsWith('.com', {
    message: 'Solo se aceptan dominios terminados en .com'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(8, {
    message: 'la contraseña debe tener mas de 8 cracteres de longitud'
  })
})

export const newLoginSchema = z.object({
  email: z.string({
    required_error: 'Email es requerido'
  }).email({
    message: 'El correo suministrado no es valido'
  }).endsWith('.com', {
    message: 'Solo se aceptan dominios terminados en .com'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(8, {
    message: 'la contraseña debe tener mas de 8 cracteres de longitud'
  })
})