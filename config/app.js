import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'
import commentRoutes from '../src/comment/comment.routes.js'
import courseRoutes from '../src/course/course.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import { limiter } from "../middlewares/rate.limit.js";

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) 
}

const routes = (app) =>{
    app.use('/comment', commentRoutes)
    app.use(courseRoutes)
    app.use('/post',publicationRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch (e){
        console.error('Server init failed', e)        
    }
}

