import { Request, Response } from "express"


// Display list of all Genre.
export const genreList = async (req: Request, res: Response): Promise<void> => {
    res.send("NOT IMPLEMENTED: Genre list")
}

// Display detail page for a specific Genre.
export const genreDetail = async (req: Request, res: Response): Promise<void> => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`)
}

// Display Genre create form on GET.
export const genreCreateGet = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre create GET")
}

// Handle Genre create on POST.
export const genreCreatePost = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre create POST")
}

// Display Genre delete form on GET.
export const genreDeleteGet = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre delete GET")
}

// Handle Genre delete on POST.
export const genreDeletePost = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre delete POST")
}

// Display Genre update form on GET.
export const genreUpdateGet = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre update GET")
}

// Handle Genre update on POST.
export const genreUpdatePost = async (req: Request, res: Response): Promise<void> => {
  res.send("NOT IMPLEMENTED: Genre update POST")
}

