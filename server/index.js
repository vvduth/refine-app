import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDb from "./mongoDB/connect.js";

dotenv.config()  
const app = express() ; 
app.use(cors()) ;

app.use(express.json({limit: "50md"}))

app.get("/", (req, res) => {
    res.send({message: "Hello world"})
})
const startServer = async() => {
    try {
        connectDb(process.env.MONGO_URL);
    } catch(e) {
        console.log(e)
    }
}