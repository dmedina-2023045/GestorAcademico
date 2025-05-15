import { Router } from "express";
import {test, addCourse, getCourse, getCourseById, updateCourse, deleteCourse} from "./course.controller.js";

const api = Router()

api.get('/testc', test)
api.post('/addCourse', addCourse)
api.get('/getCourse', getCourse)
api.get('/getCourseById/:id', getCourseById)
api.put('/updateCourse/:id', updateCourse)
api.delete('/deleteCourse/:id', deleteCourse)

export default api