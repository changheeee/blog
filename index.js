const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rcg0529:UKGls0v74KXa0pH6@boilerplate.lkobuzm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {

    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!~~안녕하세요')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


// mongosh "mongodb+srv://boilerplate.lkobuzm.mongodb.net/" --apiVersion 1 --username rcg0529
// mongodb+srv://rcg0529:UKGls0v74KXa0pH6@boilerplate.lkobuzm.mongodb.net/

//mongodb+srv://rcg0529:UKGls0v74KXa0pH6@boilerplate.lkobuzm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp

