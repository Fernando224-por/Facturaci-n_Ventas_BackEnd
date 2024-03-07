export const recoveryPassword = (toEmail, title, parr) => {
  `
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    div {
      background-color: #ffffff;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
      text-align: center;
    }

    strong {
      color: #007bff;
    }

    p {
      color: #555555;
      text-align: center;
    }
  </style>
</head>

<body>
  <div>
    <h1>${title}</h1>
    <strong>${toEmail}</strong>
    <br>
    <p>${parr}</p>
  </div>
</body>
  `
}