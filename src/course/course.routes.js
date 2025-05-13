import { Router } from "express";
import {test, addCourse, getCourse, getCourseById, updateCourse, deleteCourse} from "./course.controller";
import {isAdmin, validateJwt} from "../../middlewares/validate.jwt";

const api = Router()

api.get('/testc', [validateJwt, isAdmin], test)
api.post('/addCourse',[validateJwt, isAdmin], addCourse)
api.get('/getCourse', [validateJwt, isAdmin], getCourse)
api.get('/getCourse/:id', [validateJwt, isAdmin], getCourseById)
api.put('/updateCourse/:id', [validateJwt, isAdmin], updateCourse)
api.delete('/deleteCourse/:id', [validateJwt, isAdmin], deleteCourse)

export default api