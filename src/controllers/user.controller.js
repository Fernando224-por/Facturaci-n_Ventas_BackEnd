import { prisma } from '../db.js'
import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'
// de ultimas se agrega la notificacion de correo
import { SendMail } from '../helpers/Mails/sendEmail.js'
import { notificationTemplate } from '../helpers/Mails/templates/notificationTemplate.js'

import { useSend } from '../helpers/useSend.js'
import { useError } from '../helpers/useError.js'

// Acciones solo de administrador
export const registerNewUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const user = await prisma.user.findUnique({
      where: {
        emailUser: email,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      const identifier = uuid4()
      const hash = await bcrypt.hash(password, 10)
      const newUser = await prisma.user.create({
        data: {
          idUser: identifier,
          nameUser: name,
          emailUser: email,
          password: hash,
          role: {
            connect: {
              idRole: Number(role)
            }
          }
        }
      })
      console.log(email, name, hash, identifier)
      return res.status(200).json(useSend('Registrando Usuario', newUser))
    }
    return res.status(406).json(useError('El correo esta en uso'))
  } catch (error) {
    return res.status(500).json(useError('Something goes wrong', error))
  }
}

export const disableUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    const user = await prisma.role.findUnique({
      where: {
        idUser: id,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      return res.status(500).json(useError('Usuario no encontrado', null))
    }
    const DisableUser = await prisma.user.update({
      where: {
        idUser: id,
        AND: {
          state: 'ACTIVE'
        }
      },
      data: {
        state: 'INACTIVE'
      }
    })
    console.log(id)
    return res.status(200).json(useSend('Este usuario a sido Inhabilitado', DisableUser))
  } catch (error) {
    return res.status(500).json(useError('something goes wrong', error))
  }
}


export const manyUser = async (req, res) => {
  try {
    const usersCollection = await prisma.user.findMany()
    if (!usersCollection) {
      return res.status(404).json(useError('No se encontraron usuarios', 404))
    }
    return res.status(200).json(useSend('informacion de usuarios', usersCollection))
  } catch (error) {
    return res.status(500).json(useSend('Something goes wrong', error))
  }
}

// acciones Shared (compartidas entre roles)

export const oneUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    const user = await prisma.user.findUnique({
      where: {
        idUser: id
      }
    })
    if (!user) {
      return res.status(404).json(useError('usuario no encontrado', null))
    }
    return res.status(200).json(useSend('informacion del usuario', user))
  } catch (error) {
    return res.status(500).json(useSend('Something goes wrong', error))
  }
}

export const deleteUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    const user = await prisma.user.findUnique({
      where: {
        idUser: id,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      return res.status(500).json(useError('Usuario no encontrado', null))
    }
    const oldUser = await prisma.user.delete({
      where: {
        idUser: id
      }
    })
    return res.status(200).json(useSend('usuario Eliminado', oldUser))
  } catch (error) {
    return res.status(500).json(useSend('Something goes wrong', error))
  }
}

export const updateUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    const { name, email, role} = req.body
    const user = await prisma.user.findUnique(({
      where: {
        idUser: id,
        AND: {
          state: 'ACTIVE'
        }
      }
    }))
    if (!user) {
      return res.status(500).json(useSend('El usuario no existe', null))
    }
    const newData = await prisma.user.update({
      where: {
        idUser: id,
        AND: {
          state: 'ACTIVE'
        }
      },
      data: {
        nameUser: name,
        emailUser: email,
        updateAt: new Date(),
        role: {
          connect: {
            idRole: role
          }
        }
      }
    })
    return res.status(200).json(useSend('Actualizando usuario', newData))
  } catch (error) {
    return res.status(500).json(useError('Something goes wrong', error))
  }
}