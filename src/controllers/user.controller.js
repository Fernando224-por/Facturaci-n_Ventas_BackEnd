export const registNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    res.status(200).json({
      nameUser: name,
      emailUser: email,
      userPasword: password
    })
  } catch (error) {
    res.status(404).json({
      messageError: error
    })
  }
}