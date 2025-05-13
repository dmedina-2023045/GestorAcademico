import { Schema, model } from "mongoose";

const courseSchema = new Schema(
    {
        name:{
            type:String,
            required: [true, 'El nombre del curso es requerido'],
        },
        description:{
            type:String,
            required: [true, 'Se requiere una descripcion del curso'],
            maxLength: [1000, 'La descripcion no puede sobrepasar los 1000 caracteres']
        }
    }
)

export default model('Course', courseSchema)