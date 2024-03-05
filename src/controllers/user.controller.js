import { prisma } from '../db.js'
import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'

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
    return res.status(200).json(newUser)
  } catch (error) {
    return res.status(404).json({
      messageError: error
    })
  }
}