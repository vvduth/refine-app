import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from "./mongoDB/connect.js";
import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'

dotenv.config()  
const app = express() ; 
app.use(cors()) ;

app.use(express.json({limit: "50mb"}))

app.get("/", (req, res) => {
    res.send({message: "Hello world"})
})

app.use('/api/v1/users', userRouter) ;
app.use('/api/v1/properties', propertyRouter)
const startServer = async() => {
    try {
        connectDb(process.env.MONGO_URL);

        app.listen(5000, () => {
            console.log("server is listening on port 5000")
        })
    } catch(e) {
        console.log(e)
    }
}

startServer()  ; 