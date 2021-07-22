const express = require('express')
const winston = require('winston')
const app = express()
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

app.get('/',(req,res) => {
    res.send("Hello This is Movie database ...")
})

const port = 3000;

app.listen(port, () => {
    winston.info(`Listening  on port ${port}. . . . .`)
})