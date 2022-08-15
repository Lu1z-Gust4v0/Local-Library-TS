import { Schema, model, SchemaOptions } from "mongoose"
import { IBookInstance } from "../types/models"
import { format } from "date-fns"


// enable virtuals to be used in populate 
const options: SchemaOptions = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const bookInstanceSchema = new Schema<IBookInstance>({
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
    // If dueBack is not defined get a new Date
    return format(this.dueBack ?? new Date(), "MMM, dd'th' yyyy")
})


bookInstanceSchema.virtual("url").get(function () {
    return `/catalog/book-instance/${this._id}`
})

const BookInstance = model<IBookInstance>("BookInstance", bookInstanceSchema)

export default BookInstance