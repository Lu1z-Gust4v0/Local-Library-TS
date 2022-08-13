import { Request, Response } from "express"


// Display list of all Authors
export const authorList = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author list")
}

// Display detail page for a specific Author 
export const authorDetail = async (req: Request, res: Response): Promise<void> => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`)
}

// Handle Author create on GET
export const authorCreateGet = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author create GET")
}

// Handle Author create on POST
export const authorCreatePost = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Author create POST")
}

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