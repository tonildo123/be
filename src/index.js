const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const userRouter = require('./routes/user')

const app = express();
const port = process.env.PORT || 3636;

app.use(express.json()) // This is the middleware that allows us to parse the body of the request

app.use("/api", userRouter) // This is the base path for all routes
app.get("/", (req, res)=>{

    res.send("Bienvenido a OH MY DOG")

})


// mongoose.set('strictQuery', true);
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{console.log('coneected to mongo db')})
.catch((err)=>{console.log(err)})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

