export const notificationTemplate = (email, details) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo de Notificacion</title>
  </head>
    <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #000000; text-align: center;">
      <div id="email___content" style="max-width: 600px; margin: 40px auto; padding: 20px; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1); border-radius: 8px; border: 1px solid #d1d9e6;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hola <strong style="font-weight: bold;">${email}</strong></h2>
        <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">${details}</p>
      </div>
    </body>
  </html>
  `
}