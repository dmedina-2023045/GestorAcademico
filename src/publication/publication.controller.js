import Publication from './publication.model.js'
import Course from '../course/course.model.js'

export const test = (req, res)=>{
    console.log('Test is running Publication')
    res.send({message: 'Test is running Publication'})
}

export const addPublication = async(req , res) => {
    try{
        const data = req.body
        const id = req.user.uid
        let cId = await Course.findById(data.course)
        if(!cId)return res.status(404).send(
                {
                    success: false,
                    message: 'Course not found'
                }
            )
        let publi = new Publication(data)
        publi.user = id
        await publi.save()
        return res.status(201).send({success: true, message: 'Publication created successfully'})
        }catch(e){
            console.error(e)
            return res.status(500).send({message: 'General error', e})
        }
}

export const getPublication = async(req ,res)=>{
    try{
        const {limit = 20, skip = 0 } = req.query
        const post = await Publication.find().skip(skip).limit(limit).populate('user', ['name','surname']).populate('course','name')
        if(post.length == 0) return res.status(404).send(
            {
                success: false, message:'Publications not found'
            }
        )
        return res.send({success: true, message: 'Publications found: ', post})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updatePublication = async(req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await Publication.findByIdAndUpdate(id, data, {new: true})
        if(!update) return res.status(404).send(
            {
                success: false, 
                message: 'Publication not found'
            }
        )
        return res.send({success: true, message: 'Publication updated'})
    }catch(e){
        console.error('General error', e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const deletePublication = async(req, res)=>{
    try{
        const {id}= req.params
        const deleteP= await Publication.findByIdAndDelete(id)
        if (!deleteP)return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )
        return res.send({message: 'Publication deleted succesfully'})
    }catch (e) {
        console.log(e);
        return res.status(500).send({message: 'General Error', e})
    }   
}