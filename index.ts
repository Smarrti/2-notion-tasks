import telegramConnector from './lib/telegram/connector'
import express from "express"
import env from './env';

const path = require('path')

const app = express()
const PORT = env.PORT

app.get("/", function(request, response){
  response.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
  telegramConnector.run()
})
console.log('Started');
