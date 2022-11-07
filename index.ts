import telegramConnector from './lib/telegram/connector'
import express from "express"
import cron from 'node-cron'
import superagent from 'superagent'
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

cron.schedule('* 5 * * * *', async() => {
    await superagent.get('https://bot-notion-telegram.herokuapp.com/').end(async(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Reconnect BOT!!!' + new Date())
    }
})
})
console.log('Started');
