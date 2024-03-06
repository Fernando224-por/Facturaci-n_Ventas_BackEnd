import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
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
        errorMessage: 'Este correo ya esta en uso'
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
    const token = await createAccesToken({
      nickName: newUser.nameUser,
      mail: newUser.emailUser
    })
    res.cookie('token', token)
    return res.status(200).json(newUser)
  } catch (error) {
    return res.status(404).json({
      messageError: error
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
      return res.state(404).json({
        messageError: 'Credenciales invalidas'
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
    }
  } catch (error) {
    return res.status(404).json({
      messageError: error
    })
  }
}

export const logOut = async (req, res) => {
  res.clearCookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
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
