const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

// DB Connection here
mongoose.connect('mongodb+srv://mamun166009:1118964208@cluster0-lkz2b.mongodb.net/quack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('MongoDB connection success')
})



const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Main Routes
const adminRoute = require("./api/routes/admin")
const clientRoute = require("./api/routes/client")

// // API URL's
app.use("/quack/api/admin", adminRoute)
app.use("/quack/api/client", clientRoute)



// App Port
const port = process.env.PORT || 9000
app.get('/', (req, res) => {
    res.send("Hello I am USSD application")
})

app.listen(port, () => {
    console.log(`App running on ${port} port`)
})