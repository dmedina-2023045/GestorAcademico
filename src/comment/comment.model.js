import { Schema, model } from "mongoose";

const commetSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:[true, 'Para hacer un comentario necesitas estar con sesion iniciada']
        },
        publication:{
            type: Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'Para hacer un comentario necesitas saber a que publicacion vas a comentar']
        },
        text:{
            type: String,
            required: [true, 'No puedes comentar algo vacio!'],
            maxLength: [1000, 'Limite de caracteres : 1000']
        }
    }
)

export default model('Comment', commetSchema)