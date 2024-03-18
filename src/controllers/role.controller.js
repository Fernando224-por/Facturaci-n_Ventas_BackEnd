import { prisma } from '../db.js'
import { useSend } from '../helpers/useSend.js'
import { useError } from '../helpers/useError.js'

export const newRole = async (req, res) => {
  try {
    const { nameRole, resumeRole } = req.body
    console.log(nameRole, resumeRole)
    const newRole = await prisma.role.create({
      data: {
        nameRole: nameRole,
        resumeRole: resumeRole
      }
    })
    return res.status(200).json(useSend("Creando rol", newRole))
  } catch (error) {
    console.log('No se pudo crear al usuario')
    return res.status(500).json(useError('No se pudo crear al usuario', error))
  }
}

export const getAllRoles = async (req, res) => {
  try {
    const result = await prisma.role.findMany({
      where: {
        state: 'ACTIVE'
      }
    })
    return res.status(200).json(useSend('listado de usuarios', result))
  } catch (error) {
    console.log('No se pudo listar los roles')
    return res.status(500).json(useError('no se pueden listar los usuarios', error))
  }
}

export const getOneRole = async (req, res) => {
  try {
    const identifier = Number(req.params.id)
    const result = await prisma.role.findUnique({
      where: {
        idRole: identifier,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    return res.status(200).json(useSend('listando rol', result))
  } catch (error) {
    console.log('No se pudo listar el rol especificado')
    return res.status(500).json(useError('Something goes wrong', error))
  }
}

export const modifyRole = async (req, res) => {
  try {
    const identifier = Number(req.params.id)
    const { nameRole, resumeRole } = req.body
    const roleFound = await prisma.role.findUnique({
      where: {
        idRole: identifier,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!roleFound) {
      return res.status(404).json(useError('rol no encontrado'))
    }
    const roleUpdated = await prisma.role.update({
      where: {
        idRole: identifier,
        AND: {
          state: 'ACTIVE'
        }
      },
      data: {
        nameRole: nameRole,
        resumeRole: resumeRole
      }
    })
    return res.status(200).json(useSend('Rol actualizado', roleUpdated))
  } catch (error) {
    return res.status(500).json(useError('Something goes wrong', error))
  }
}

export const disbleRole = async (req, res) => {
  try {
    const identifier = Number(req.params.id)
    const roleFound = await prisma.role.findUnique({
      where: {
        idRole: identifier,
        AND: {
          state: 'ACTIVE'
        }
      }
    })
    if (!roleFound) {
      return res.status(404).json(useError('rol no encontrado'))
    }
    const disableRole = await prisma.role.update({
      where: {
        idRole: identifier,
        AND: {
          state: 'ACTIVE'
        }
      },
      data: {
        state: 'INACTIVE'
      }
    })
    return res.status(200).json(useSend('Rol actualizado', disableRole))
  } catch (error) {
    console.log('No se pudo Inhabilitar el rol')
    return res.status(500).json(useError('Something goes wrong', error))
  }
}