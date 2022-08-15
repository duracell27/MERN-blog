import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js"
import postsRoute from "./routes/posts.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

//middlewares
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.oei8ool.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
        
    }
}

start();