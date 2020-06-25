const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

// DB Connection here
// mongoose.connect('mongodb://localhost:27017/quack', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


// Main Routes
// const adminRoute = require("./api/routes/admin")
const clientRoute = require("./api/routes/client")

// // API URL's
// app.use("/dhakaboss/ticketing/api/admin", adminRoute)
app.use("/quack/api/client", clientRoute)



// App Port
const port = process.env.PORT || 9000
app.get('/', (req, res) => {
    res.send("Hello I am USSD application")
})

app.listen(port, () => {
    console.log(`App running on ${port} port`)
})