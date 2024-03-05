import app from './app.js'
import { PORT } from './config.js'

async function main(){
  try {
    app.listen(PORT)
    console.log(`Server is runing on port ${PORT}`)
  } catch (error) {
    console.error(error)
  }
}

main()
