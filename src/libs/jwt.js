import jwt from 'jsonwebtoken'
import { JWTKEY } from '../config.js'

export function createAccesToken(paylod) {
  return new Promise((resolve, reject) => {
    jwt.sign(paylod, JWTKEY, {
      expiresIn: '1H'
    }, (error, token) => {
      if (error) reject(error)
      resolve(token)
    })
  })
}

export async function verifyPassToken(payload) {
  console.log("Token...");
  console.log(payload);
  const decode = await jwt.decode(payload)
  return decode
}