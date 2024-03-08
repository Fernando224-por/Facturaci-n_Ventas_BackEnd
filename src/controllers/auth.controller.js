import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { SendMail } from '../helpers/Mails/sendEmail.js'
import { useSend } from '../helpers/useSend.js'
import { useError } from '../helpers/useError.js'
import { notificationTemplate } from '../helpers/Mails/templates/notificationTemplate.js'
import { createAccesToken } from '../libs/jwt.js'
import { JWTKEY } from '../config.js'


export const registNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const userFound = await prisma.user.findUnique({
      where: {
        emailUser: email,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (userFound) {
      return res.status(406).json({
        message: 'Este correo ya esta en uso'
      })
    }
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
    await SendMail(notificationTemplate(newUser.emailUser, "Registro Exitoso"), 
     "Has sido registrado en el sistema",
     newUser.emailUser
    )
    const token = await createAccesToken({
      nickName: newUser.nameUser,
      mail: newUser.emailUser
    })
    res.cookie('token', token)
    return res.status(200).json({
      message: 'Registrado exitosamente'
    })
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await prisma.user.findUnique({
      where: {
        emailUser: email,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!userFound) {     
      return res.status(406).json({
        message: 'Credenciales invalidas'
      }) 
    }
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (isMatch) {
      const token = await createAccesToken({
        nickName: userFound.nameUser,
        mail: userFound.emailUser
      })
      res.cookie('token', token)
      return res.status(200).json({
        message: 'Logeo exitoso'
      })
    } else {
      return res.status(406).json({
        message: 'Credenciales invalidas'
      }) 
    }
  } catch (error) {
    return res.status(404).json({
      message: error
    })
  }
}

export const logOut = async (req, res) => {
  res.clearCookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body
    await SendMail(notificationTemplate(email, 'Prueba de correo'), 
    "este es un correo de pruebas",
    email
    )
    return res.status(200).json(useSend("Correo enviado", "Good request"))
  } catch (error) {
    return res.status(500).json(useError("Correo no enviado", "Bad request"))
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(token, JWTKEY, async (error, user) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' })
    const userFound = await prisma.user.findUnique({
      where: {
        emailUser: user.mail,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })
    res.status(200).json({
      id: userFound.nameUser,
      status: userFound.state
    })
  })
}
