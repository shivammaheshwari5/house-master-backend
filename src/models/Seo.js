import { Schema } from 'mongoose';
import { mongoSchemaOptions } from '../utilities/constants.js';


const SeoSchema = new Schema({
        page_title: String,
        title: { type: String, required: true },
        description: { type: String, required: true },
        robots: String,
        keywords: String,
        url: String,
        footer_title: String,
        footer_description: String,
        script: String,
        status: {
            type: Boolean,
            default: true
        },
        path: {
            type: String,
            required: true,
            unique: true
        },
        twitter: {
            title: String,
            description: String,
            image: {
                type: Schema.Types.ObjectId,
                ref: 'Image'
            }
        },
        open_graph: {
            title: String,
            description: String,
            image: {
                type: Schema.Types.ObjectId,
                ref: 'Image'
            }
        }
    },
    mongoSchemaOptions
)


export default SeoSchema;