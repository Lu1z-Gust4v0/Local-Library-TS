import { model, Schema, SchemaOptions } from "mongoose"
import { IBook, BookModel } from "../types/models"


// enable virtuals to be used in populate 
const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const bookSchema = new Schema<IBook, BookModel>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true},
    summary: { type: String, required: true},
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }]
}, options)

bookSchema.virtual("url").get(function () {
    return `/catalog/book/${this._id}`
})

const Book = model<IBook, BookModel>("Book", bookSchema)

export default Book