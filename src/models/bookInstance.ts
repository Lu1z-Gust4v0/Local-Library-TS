import { Schema, model, SchemaOptions } from "mongoose"
import { IBookInstance, BookInstanceModel } from "../types/models"
import { format } from "date-fns"


// enable virtuals to be used in populate 
const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const bookInstanceSchema = new Schema<IBookInstance, BookInstanceModel>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true},
    imprint: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ["Available", "Maintenance", "Loaned", "Reserved"], 
        default: "Maintenance"
    },
    dueBack: { type: Date, default: Date.now }
})

bookInstanceSchema.virtual("formattedDueBack").get(function () {
    // If dueBack is not defined return an empty string
    return this.dueBack ? format(this.dueBack, "MMM dd'th', yyyy") :  "" 
})

bookInstanceSchema.virtual("formFormattedDueBack").get(function () {
    return this.dueBack ? format(this.dueBack, "yyyy-MM-dd") : ""
})

bookInstanceSchema.virtual("url").get(function () {
    return `/catalog/book-instance/${this._id}`
})

const BookInstance = model<IBookInstance, BookInstanceModel>("BookInstance", bookInstanceSchema)

export default BookInstance