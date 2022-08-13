import { Request, Response, NextFunction } from "express"
import BookInstance from "../models/bookInstance"


// Display list of all BookInstances 
export const bookInstanceList = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const bookInstances = await BookInstance
          .find()
          .populate("book")
          .exec()
        
        res.render("bookInstanceList", { 
            title: "Book Instance List", 
            bookInstanceList: bookInstances
        })
    
    } catch(error: any) {
        return next(error)
    }
}

// Display detail page for a specific BookInstance
export const bookInstanceDetail = async (req: Request, res: Response): Promise<void> => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
}

// Display BookInstance create form on GET
export const bookInstanceCreateGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance create GET")
}

// Handle BookInstance create on POST
export const bookInstanceCreatePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance create POST")
}

// Display BookInstance delete form on GET
export const bookInstanceDeleteGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance delete GET")
}

// Handle BookInstance delete on POST
export const bookInstanceDeletePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance delete POST")
}

// Display BookInstance update form on GET
export const bookInstanceUpdateGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance update GET")

}

// Handle BookInstance update on POST
export const bookInstanceUpdatePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: BookInstance delete POST")
}