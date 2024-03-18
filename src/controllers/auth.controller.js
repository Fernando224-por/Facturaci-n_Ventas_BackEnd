import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { SendMail } from '../helpers/Mails/sendEmail.js'
import { useSend } from '../helpers/useSend.js'
import { useError } from '../helpers/useError.js'
import { notificationTemplate } from '../helpers/Mails/templates/notificationTemplate.js'
import { createAccesToken, verifyPassToken } from '../libs/jwt.js'
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
        password: hash,
        role: {
          connect: { idRole: Number(2) }
        }
      }
    })
    await SendMail(notificationTemplate(newUser.emailUser, "Registro Exitoso"),
      "Has sido registrado en el sistema",
      newUser.emailUser
    )
    return res.status(200).json({
      message: 'Registrado exitosamente',
      data: newUser
    })
  } catch (error) {
    return res.status(500).json({
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
      const dataUser = {
        nickName: userFound.nameUser,
        mail: userFound.emailUser
      }
      res.cookie('token', token)
      return res.status(200).json(useSend('Logeo exitoso', dataUser))
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

export const recoveryPassword = async (req, res) => {
  try {
    const { email } = req.body
    const title = 'Codigo cambio de contraseña'
    const user = await prisma.user.findUnique({
      where: {
        emailUser: email,
        AND: {
          state: 'ACTIVE'
        }
      }
    })

    if (!user) {
      return res.status(500).json({
        message: 'No se pudo enviar el mensaje'
      })
    }
    const code = Math.floor(Math.random() * 9000) + 1000
    const token = await createAccesToken({
      verifyCode: code,
      id: user.idUser
    })
    await SendMail(notificationTemplate(
      email,
      `Codigo de verificacion es: <strong>${code}</strong> `
    ),
      title,
      user.emailUser
    )
    console.log(code)
    res.cookie('CodeVerify', token)
    return res.status(200).json(useSend("Correo Enviado", token))
  } catch (error) {
    return res.status(500).json(useError("El correo no pudo ser Enviado", error))
  }
}

export const verifyCodePassword = async (req, res) => {
  try {
    const { code } = req.body
    const { CodeVerify } = req.cookies
    const title = 'Solicitud cambio de Contraseña'

    if (!CodeVerify) {
      return res.status(404).json({
        messaje: 'Cookie no encontrada'
      })
    }
    const decode = await verifyPassToken(CodeVerify)
    console.log(code, " ", decode.verifyCode.toString())
    const user = await prisma.user.findUnique({
      where: {
        idUser: decode.id,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }
    if (!decode.verifyCode) {
      return res.status(406).json({
        message: 'Token no valido'
      })
    }
    if (String(code) !== decode.verifyCode.toString()) {
      return res.status(406).json({
        message: 'Codigo Invalido'
      })
    }
    await SendMail(notificationTemplate(
      user.emailUser,
      `<strong>Se ha solicitado un cambio de contraseña de tu cuenta</strong>`
    ),
      title,
      user.emailUser
    )
    return res.status(200).json(useSend('Correo enviado', null))
  } catch (error) {
    return res.status(500).json(useError('el correo no a sido enviado', error))
  }
}

export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body
    const { CodeVerify } = req.cookies
    console.log(newPassword)
    const title = 'Cambio de contraseña exitoso '
    if (!CodeVerify) {
      return res.status(404).json({
        messaje: 'Cookie no encontrada'
      })
    }
    const decode = await verifyPassToken(CodeVerify)
    const user = await prisma.user.findUnique({
      where: {
        idUser: decode.id,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }
    const isMatch = await bcrypt.compare(newPassword, user.password)
    const hash = await bcrypt.hash(newPassword, 10)
    if (!isMatch) {
      const passChanged = await prisma.user.update({
        where: {
          idUser: decode.id,
          AND: {
            state: 'ACTIVE'
          }
        },
        data: {
          password: hash
        }
      })
      console.log(passChanged)
      await SendMail(notificationTemplate(
        passChanged.emailUser,
        `<strong>Se ha realizado un cambio de contraseña de tu cuenta</strong>`
      ),
        title,
        passChanged.emailUser
      )
      res.clearCookie('CodeVerify', '', {
        expires: new Date(0)
      })
      return res.status(200).json({
        message: 'constraseña actualizada'
      })
    } else {
      return res.status(406).json(useSend('Tu contraseña a sido actualizada!!'))
    }
  } catch (error) {
    return res.status(5000).json({
      message: 'Something goes wrong'
    })
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
