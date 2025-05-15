import { Router } from "express";
import {test, addCourse, getCourse, getCourseById, updateCourse, deleteCourse} from "./course.controller.js";
import {isAdmin, validateJwt} from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/testc', test)
api.post('/addCourse',[validateJwt, isAdmin], addCourse)
api.get('/getCourse', getCourse)
api.get('/getCourseById/:id', getCourseById)
api.put('/updateCourse/:id', [validateJwt, isAdmin], updateCourse)
api.delete('/deleteCourse/:id', [validateJwt, isAdmin], deleteCourse)

export default api