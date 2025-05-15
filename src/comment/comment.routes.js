import {Router} from 'express'
import { test, addComment, updateComment, deleteCommnet} from './comment.controller.js'

const api = Router()

api.get('/testco', test)
api.post('/addComment/:id', addComment)
api.put('/updateComment/:id', updateComment)
api.delete('/deleteComment/:id', deleteCommnet)

export default api