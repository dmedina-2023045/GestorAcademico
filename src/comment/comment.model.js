import { Schema, model } from "mongoose";

const commetSchema = new Schema(
    {
        text:{
            type: String,
            required: [true, 'No puedes comentar algo vacio!'],
            maxLength: [1000, 'Limite de caracteres : 1000']
        },
        date:{
            type:Date,
            default:Date.now()
        }
    }
)

export default model('Comment', commetSchema)