import { Schema, model } from "mongoose";

const publicationSchema = new Schema(
    {
        title:{
            type: String,
            required: [true, 'Para realizar una publicacion es requerido el titulo'],
            maxLength: [64, 'El titulo no puede sobrepasar los 32 caracteres']
        },
        content:{
            type: String,
            required: [true, 'No puedes hacer una publicacion en blanco'],
            maxLength: [1000, 'No puedes pasar los 1000 caracteres en una publicacion']
        },
        comment:[{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            required: false
        }],
        course:{
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'No puedes hacer una publicacion sin asignarle el curso']
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }
)

export default model('Publication', publicationSchema)