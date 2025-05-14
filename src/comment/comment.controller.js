import Comment from "./comment.model.js";
import Publication from "../publication/publication.model.js";

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const addComment = async (req, res) => {
    const {pId} = req.params 
    const data = req.body 
    const id = req.user.uid   
    try{
        const publication = await Publication.findById(pId) 
        const comment = new Comment({...data, pId, id}) 
        if (!publication)return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        ) 
        await Publication.findByIdAndUpdate(pId, {$push: { comments: Comment._id} }, {new: true}) 
        await comment.save() 
        return res.status(201)({success: true,message: 'Your comment is posted!'})
    }catch (e) {
        console.error(e) 
        return res.status(500)({message: 'General error'})
    }
}

export const updateComment = async(req, res) => {
    try{
        let {id} = req.params
        let data = req.body
        const uid = req.user.uid   
        const comment = await Comment.findById(id) 
        if (!comment)return res.status(404).send(
                {
                    success: false,
                    message: 'Comentario no encontrado'
                }
            )
        if(comment.user.toString() !== uid)return res.status(404).send(
            {
                success: false,
                message: `No se puede editar| Credenciales invalidas`
            }
        )
        let updatedComment = await Comment.findByIdAndUpdate(id, data, {new: true})
        if(!updatedComment) return res.status(404).send(
            {
                success: false,
                message: 'Comentario no actualizado'
            }
        )
        return res.send({success: true, message: 'Comment updated'})
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
}

export const deleteCommnet = async (req, res) => {
    try{
        let {id} = req.params
        const cId = req.user.uid   
        const comment = await Comment.findById(id)
        if(!comment)return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        if(comment.user.toString() !== cId)return res.status(404).send({
                success: false,
                message: `The comment doesn't belong to you`
            }
        )
        let deletedComment = await Comment.findByIdAndDelete(id)
        if(!deletedComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, not deleted'
            }
        )
        return res.send({success: true, message: 'Comment deleted successfully'})
    }catch(e){
        console.error(e) 
        return res.status(500).send({success: false, message: 'General Error', e})
    }
}