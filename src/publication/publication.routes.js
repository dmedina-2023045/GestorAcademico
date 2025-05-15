import { Router } from "express"
import {test, addPublication, getPublication, updatePublication, deletePublication} from './publication.controller.js'

const api = Router()

api.get('/testp', test)
api.post('/addPublication', addPublication)
api.get('/getPublication', getPublication)
api.put('/updatePublication/:id', updatePublication)
api.delete('/deletePublication/:id', deletePublication)

export default api