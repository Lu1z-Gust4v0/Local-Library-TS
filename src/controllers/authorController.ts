import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { validateCreateAuthor } from "../middlewares/validateFields"
import Author from "../models/author"
import Book from "../models/book"
import { IAuthor } from "../types/models"


// Display list of all Authors
export const authorList = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const authors = await Author.find()
          .sort("firstName") // or sort({ firstName: "asc" })

        res.render("authorList", { title: "Author List", authorList: authors })
    } catch (error: any) {
        return next(error)
    }
}

// Display detail page for a specific Author 
export const authorDetail = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const author = await Author.findById(req.params.id)
        
        if (!author) {
            const error = new Error("Author not found")
            return next(error)
        }
        
        const sameAuthorBooks = await Book.find(
            { author: req.params.id }, "title summary"
        )

        res.render("authorDetail", {
            title: "Author Detail",
            author: author,
            books: sameAuthorBooks
        })
    } catch(error: any) {
        return next(error)
    }
}

// Handle Author create on GET
export const authorCreateGet = async (req: Request, res: Response): Promise<void> => {
    res.render("authorForm", { title: "Create Author" })
}

// Handle Author create on POST
export const authorCreatePost = [
    // Validate and sanitize fields
    ...validateCreateAuthor,
    async (
        req: Request, 
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // Extract validation errors
            const errors = validationResult(req)
            const data: IAuthor = req.body   
            
            if (!errors.isEmpty()) {
                res.render("authorForm", {
                    title: "Create Author",
                    author: data,
                    errors: errors.array()
                })
                return 
            }
            // Create new Author 
            const author = new Author(data)

            await author.save()

            res.redirect(author.url)
        } catch (error: any) {
            next(error)
        }
    }
]

// Display Author delete form on GET
export const authorDeleteGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author delete GET")
}

// Handle Author delete on POST
export const authorDeletePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author delete POST")
}

// Display Author update form on GET
export const authorUpdateGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author update GET")
}

// Handle Author update on POST
export const authorUpdatePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author update POST")
}
