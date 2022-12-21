const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = 8081;

const API_KEY = process.env.KEY
const API_URL = 'https://api.binance.com/api/v3/ticker/price'

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


app.get('/prices', async (req, res) => {
    if(req.body.key === API_KEY){
        const dataFunc = await getData()
        res.send(dataFunc)
    }
    else{
        res.status(401).send()
    }
})

const getData = async  () => {
    let res = await fetch(API_URL)
    const data = await res.json()
    return data
}
