import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));
const { name = 'default', port = '3000'} = args;

//Connect mongodb
mongoose.connect(config.TEST_DB_URL)

const app = express()

//Middlewares
app.use(morgan('common'))
app.use(bodyParser.json())

//Routes
const users = require('./routes/userRoute')
app.use('/api/users', users)
const tweets= require('./routes/tweetRoute')
app.use('/api/tweets', tweets)

app.listen(port)
console.log(name,'listening at',port)