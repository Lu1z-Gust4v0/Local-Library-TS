import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { validateCreateBookInstance } from "../middlewares/validateFields"
import BookInstance from "../models/bookInstance"
import Book from "../models/book"
import { IBook, IBookInstance } from "../types/models"


// Display list of all BookInstances 
export const bookInstanceList = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookInstances = await BookInstance
          .find()
          .populate<{ book: IBook }>("book")
        
        res.render("bookInstanceList", { 
            title: "Book Instance List", 
            bookInstanceList: bookInstances
        })
    
    } catch(error: any) {
        return next(error)
    }
}

// Display detail page for a specific BookInstance
export const bookInstanceDetail = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookInstance = await BookInstance
          .findById(req.params.id)
          .populate<{ book: IBook }>("book")     

        if (!bookInstance) {
            const error = new Error("Book copy not found")
            return next(error)
        }

        res.render("bookInstanceDetail", {
            title: `Copy ${bookInstance.book.title}`,
            bookInstance
        })
    } catch (error: any) {
        next(error)
    }
}

// Display BookInstance create form on GET
export const bookInstanceCreateGet = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const books = await Book.find({}, "title")
        
        res.render("bookInstanceForm", {
            title: "Create Book Instance",
            bookList: books
        })
    } catch (error: any) {
        next(error)
    }
}

// Handle BookInstance create on POST
export const bookInstanceCreatePost = [
    ...validateCreateBookInstance,
    async (
        req: Request, 
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const errors = validationResult(req)
            const data: IBookInstance = req.body

            const bookInstance = new BookInstance(data)
            
            if (!errors.isEmpty()) {
                // There are errors. Render form again with sanitized data
                // values and erros messages
                const books = await Book.find({}, "title")

                res.render("bookInstanceForm", {
                    title: "Create Book Instance",
                    bookList: books,
                    selectedBook: bookInstance.book._id,
                    errors: errors.array(),
                    bookInstance,
                })
                return 
            }
            await bookInstance.save()
            // Sucess. Redirect to the new record
            res.redirect(bookInstance.url)
        } catch (error: any) {
            next(error)
        }
    }
]

// Display BookInstance delete form on GET
export const bookInstanceDeleteGet = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const instance = await BookInstance.findById(req.params.id)

        if (!instance) res.redirect("/catalog/book-instances")

        res.render("bookInstanceDelete", {
            title: "Delete Book Instance",
            instance: instance
        })
    } catch (error: any) {
        next(error)
    }
}

// Handle BookInstance delete on POST
export const bookInstanceDeletePost = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const instance = await BookInstance.findById(req.params.id)

        await BookInstance.findByIdAndRemove(req.params.id) 

        res.redirect("/catalog/book-instances")
    } catch (error: any) {
        next(error)
    }
}

// Display BookInstance update form on GET
export const bookInstanceUpdateGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance update GET")

}

// Handle BookInstance update on POST
export const bookInstanceUpdatePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance delete POST")
}