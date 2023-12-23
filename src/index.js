// require('dotenv').config({path: './env'})
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME} from "./constants";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './dotenv'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is runing on port :${process.env.PORT
                }`)
        })
    })
    .catch((error) => {
        console.log("MONGO db error !!!", error)
    })







// import express from "express";
// const app = express()

// IIFE
// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error", (error)=>{
//             console.log("ERR: ",error)
//             throw error;
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }catch(error){
//         console.error("ERROR: ",error);
//         throw error
//     }
// })()



// one approach
// function connectDB(){

// }

// connectDB()