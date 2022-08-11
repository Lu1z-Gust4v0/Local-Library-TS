import { Schema, model } from "mongoose"
import { IGenre } from "../types/models"


const genreSchema = new Schema<IGenre>({
    name: { 
        type: String, 
        required: true, 
        minLength: 3, 
        maxLength: 100
    }
})

genreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`
})

const Genre = model<IGenre>("Genre", genreSchema)

export default Genre