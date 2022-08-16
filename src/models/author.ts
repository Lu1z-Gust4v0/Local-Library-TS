import { Schema, model, SchemaOptions } from "mongoose"
import { IAuthor, AuthorModel } from "../types/models"
import { format } from "date-fns"

// enable virtuals to be used in populate 
const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const authorSchema = new Schema<IAuthor, AuthorModel>({
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
}, options) 

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
    const birthDate: string = this.dateOfBirth ? format(this.dateOfBirth, "MMM dd'th', yyyy") : ""
    const deathDate: string = this.dateOfDeath ? format(this.dateOfDeath, "MMM dd'th', yyyy") : ""
    
    return `${birthDate} - ${deathDate}`
})

authorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`
})

const Author = model<IAuthor, AuthorModel>("Author", authorSchema)

export default Author