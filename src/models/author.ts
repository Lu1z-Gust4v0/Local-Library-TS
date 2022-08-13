import { Schema, model } from "mongoose"
import { IAuthor } from "../types/models"


const authorSchema = new Schema<IAuthor>({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
}) 

// Virtuals 
authorSchema.virtual("name").get(function () {
    let fullname = ""
    if (this.firstName && this.familyName) {
        fullname = `${this.familyName}, ${this.firstName}`
    }
    // Returns an empty string if one of the fields don't exist
    return fullname
})

authorSchema.virtual("lifespan").get(function () {
    return `${this.dateOfBirth?.getFullYear()} - ${this.dateOfDeath?.getFullYear()}`
})

authorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`
})

const Author = model<IAuthor>("Author", authorSchema)

export default Author