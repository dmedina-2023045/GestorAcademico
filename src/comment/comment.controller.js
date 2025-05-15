import Comment from "./comment.model.js";
import Publication from "../publication/publication.model.js";

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const addComment = async (req, res) => {
    try {
        const {id} = req.params 
        const data = req.body
        const publication = await Publication.findById(id) 
        if (!publication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        ) 
        const comment = new Comment(data) 
        await comment.save() 
        if (!publication.comment) publication.comment = [] 
        publication.comment.push(comment._id) 
        await publication.save() 
        return res.status(200).send({success: true, message: 'Comment saved successfully', commentId: comment._id}) 
    } catch (e) {
        console.error(e) 
        return res.status(500).send({message: 'Internal server error', e}) 
    }
} 

export const updateComment = async (req, res) => {
    try {
        const {id} = req.params 
        const data = req.body
        const comment = await Comment.findById(id)
        
        if (!comment) return res.status(404).send(
            {
                success: false,
                message: 'Coment not found'
            }
        ) 
        let updatedComment = await Comment.findByIdAndUpdate(id, data, {new: true})
        if(!updatedComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, not updated'
            }
        )
        await comment.save() 
        return res.status(200).send({success: true, message: 'Comment saved successfully', commentId: comment._id}) 
    } catch (e) {
        console.error(e) 
        return res.status(500).send({message: 'Internal server error', e}) 
    }
} 
export const deleteCommnet = async (req, res) => {
    try{
        let {id} = req.params
        const comment = await Comment.findById(id)
        if(!comment)return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
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