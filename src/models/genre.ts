import { Schema, model, SchemaOptions } from "mongoose"
import { IGenre } from "../types/models"


// enable virtuals to be used in populate 
const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const genreSchema = new Schema<IGenre>({
    name: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100
    }
}, options)

genreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`
})

const Genre = model<IGenre>("Genre", genreSchema)

export default Genre