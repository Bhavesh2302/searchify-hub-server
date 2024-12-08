require('dotenv').config()
const express = require('express')
const { connection } = require('./configs/dbConfig')
const { watchController } = require('./controllers/watchController')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use("/watch",watchController)

const port = process.env.port || 8080


app.listen(port,async()=>{
try{
    await connection
    console.log(`app is running on http://localhost:${port}`)
} catch (err){
 console.log(err)
}
})
