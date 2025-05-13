import { Schema, model } from "mongoose";

const commetSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required:[true, 'Para hacer un comentario necesitas estar con sesion iniciada']
        },
        text:{
            type: String,
            required: [true, 'No puedes comentar algo vacio!'],
            maxLength: [1000, 'Limite de caracteres : 1000']
        }

    }
)

export default model('Comment', commentSchema)