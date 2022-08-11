import { Schema, model } from "mongoose"
import { IAuthor } from "../types/models"


const authorSchema = new Schema<IAuthor>({
    firstName: { Type: String, required: true, maxLength: 100 },
    familyName: { Type: String, required: true, maxLength: 100 },
    dateOfBirth: {type: Date, required: true },
    dateOfDeath: {type: Date }
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
    let lifetime = ""   
    if (this.dateOfDeath) {
        lifetime = `${this.dateOfBirth.getFullYear()} - ${this.dateOfDeath.getFullYear()}`
    }
    if (!this.dateOfDeath) {
        lifetime = `${this.dateOfBirth.getFullYear()} - `
    }
    return lifetime
})

authorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`
})

const Author = model<IAuthor>("Author", authorSchema)

export default Author