const express = require('express');
const serverless = require("serverless-http");
const mongoose = require('mongoose')
const route = require('../src/routers/route')
const app = express()
const cors=require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(express.json())

app.use(cors(corsOptions))


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ayush8120:GeGo5qhr7wM6VQyg@cluster0.n1nevi5.mongodb.net/Morn-Stack-bonus-Project?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))

// app.use('/',route)
app.use(`/.netlify/functions/api`, route);


app.use((req, res) => {
    res.status(404).send({ status: false, message: "Url not found" })
})


// app.listen(process.env.PORT ||3003,function ()
// {console.log("Express app is running on port "+(process.env.PORT ||3003))})

module.exports = app;
module.exports.handler = serverless(app);