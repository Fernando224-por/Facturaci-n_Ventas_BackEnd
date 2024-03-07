import { transporter } from './mailConfig.js'

export const SendMail = async (html, subject, toEmail) => {
  try {
    const mailBody = await transporter.sendMail({
      from: 'andresfernandoxd1591@gmail.com',
      to: toEmail,
      subject,
      html
    })
    console.log ("mensaje enviado con exito")
  } catch (error) {
    console.log (error)
  }
}