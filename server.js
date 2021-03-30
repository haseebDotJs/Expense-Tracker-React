const express = require('express')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require('path')

const { connectDB } = require('./database')

dotenv.config({ path: './config/config.env' })


const app = express()

connectDB()

// It enables us to use req.bodystuff
app.use(express.json({ extended: false }))
app.use(morgan("dev"))

const transactions = require('./routes/transactions.routes')
app.use('/api/v1/transactions', transactions)


const users = require('./routes/user.routes')
app.use('/api/v1/user', users)

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.blue.bold)
})