import { Request, Response } from "express"
import Book from "../models/book"
import BookInstance from "../models/bookInstance"
import Author from "../models/author"
import Genre from "../models/genre"


export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a data object to be passed to the response
    const data = {
      bookCount: await Book.countDocuments({}),
      bookInstanceCount: await BookInstance.countDocuments({}),
      bookInstanceAvaliable: await BookInstance.countDocuments({ status: "Available" }),
      authorCount: await Author.countDocuments({}),
      genreCount: await Genre.countDocuments({}),
    }

    res.render("index", { title: "Local Library Home", data: data })

  } catch(error: any) {
    res.render("index", { 
      title: "local Library Home", 
      data: {}, 
      error: new Error(error.message || "Unknown Error") 
    })
  }
}

// Display list of all books.
export const bookList = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book list')
}

// Display detail page for a specific book.
export const bookDetail = async (req: Request, res: Response): Promise<void> => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
}

// Display book create form on GET.
export const bookCreateGet = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book create GET')
}

// Handle book create on POST.
export const bookCreatePost = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book create POST')
}

// Display book delete form on GET.
export const bookDeleteGet = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book delete GET')
}

// Handle book delete on POST.
export const bookDeletePost = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

// Display book update form on GET.
export const bookUpdateGet = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book update GET')
}

// Handle book update on POST.
export const bookUpdatePost = async (req: Request, res: Response): Promise<void> => {
  res.send('NOT IMPLEMENTED: Book update POST')
}