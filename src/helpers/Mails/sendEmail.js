import { transporter } from './mailConfig.js'

export const SendMail = async () => {
  try {
    const mailBody = await transporter.sendMail({
      from: 'andresfernandoxd1591@gmail.com',
      to: 'andresfernandoxd1591@gmail.com',
      subject: 'Test de Nodemailer',
      text: 'Probando el envio de correo con nodemailer'
    })
    return mailBody
  } catch (error) {
    return error
  }
}