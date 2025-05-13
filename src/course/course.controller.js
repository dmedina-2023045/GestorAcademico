import Course from './course.model.js'

export const test = (req, res)=>{
    console.log('Course is running')
    res.send({message: 'Course is running'})
}

export const addCourse = async(req, res)=>{
    try{    
        let data = req.body
        let cat = new Course(data)
        await cat.save()
        return res.send({message: `Course added succesfully`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCourse = async(req ,res)=>{
    try{
        const {limit = 20, skip = 0 } = req.query
        const cat = await Course.find().skip(skip).limit(limit)
        if(cat.length == 0) return res.status(404).send(
            {
                success: false, 
                message:'Courses not found'
            }
        )
        return res.send({success: true, message: 'Courses found: ', cat})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCourseById = async(req, res)=>{
    try {
        let {id} = req.params
        let cat = await Course.findById(id)
        if(!cat) return res.status(404).send(
            {
                success: false, 
                message: 'Courses not found'
            }
        )
        return res.send({success: true, message: 'Courses found: ', cat})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateCourse = async(req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await Course.findByIdAndUpdate(id, data, {new: true})
        if(!update) return res.status(404).send(
            {
                success: false, message: 'Course not found'
            }
        )
        return res.send({success: true, message: 'Course updated', update})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const deleteCourse = async(req, res)=>{
    try {
        const {id} = req.params
        const deletec = await Course.findByIdAndDelete(id)
        if (!deletec)return res.status(404).send(
            {
                success: false,
                message: 'Course not found'
            }
        )
            return res.send({message: 'Course deleted succesfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }   
}