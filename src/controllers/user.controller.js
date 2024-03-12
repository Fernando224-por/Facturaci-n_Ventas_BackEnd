import { prisma } from '../db.js'
import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'
// de ultimas se agrega la notificacion de correo
import { SendMail } from '../helpers/Mails/sendEmail.js'
import { notificationTemplate } from '../helpers/Mails/templates/notificationTemplate.js'

import { useSend } from '../helpers/useSend.js'
import { useError } from '../helpers/useError.js'

export const registerNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
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
          password: hash
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

export const updateUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    const { name, email } = req.body
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
        updateAt: new Date()
      }
    })
    return res.status(200).json(useSend('Actualizando usuario', newData))
  } catch (error) {
    return res.status(500).json(useError('Something goes wrong', error))
  }
}

export const disableUser = async (req, res) => {
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
    const DisableUser = await prisma.user.update({
      where: {
        idUser: id,
        AND: {
          state:'ACTIVE'
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

export const deleteUser = async (req, res) => {
  try {
    const id = String(req.params.id)
    console.log(id)
    return res.status(200).json(useSend('Eliminando Usuario', id))
  } catch (error) {
    return res.status(200).json(useSend('Something goes wrong', error))
  }
}