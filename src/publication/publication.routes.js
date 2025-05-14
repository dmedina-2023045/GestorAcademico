import { Router } from "express"
import {test, addPublication, getPublication, updatePublication, deletePublication} from './publication.controller.js'
import {validateJwt} from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/testp', test)
api.post('/addPublication', validateJwt, addPublication)
api.get('/getPublication', getPublication)
api.put('/updatePublication/:id', validateJwt, updatePublication)
api.delete('/deletePublication/:id', validateJwt, deletePublication)

export default api