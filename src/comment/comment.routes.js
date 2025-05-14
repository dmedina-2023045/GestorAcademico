import {Router} from 'express'
import {validateJwt } from '../../middlewares/validate.jwt.js'
import { test, addComment, updateComment, deleteCommnet} from './comment.controller.js'

const api = Router()

api.get('/testco', test)
api.post('/addComment/:id', validateJwt, addComment)
api.put('/updateComment/:id', validateJwt, updateComment)
api.delete('/deleteComment/:id', validateJwt, deleteCommnet)

export default api