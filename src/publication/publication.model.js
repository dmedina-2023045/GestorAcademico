import { Schema, model } from "mongoose";

const publicationSchema = new Schema(
    {
        title:{
            type: String,
            required: [true, 'Para realizar una publicacion es requerido el titulo'],
            maxLength: [64, 'El titulo no puede sobrepasar los 64 caracteres']
        },
        content:{

        },
        comment:{

        },
        course:{

        },
        user:{

        }

    }
)

export default model('Publication', publicationSchema)