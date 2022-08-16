import { Request, Response, NextFunction } from "express"
import Book from "../models/book"
import BookInstance from "../models/bookInstance"
import Author from "../models/author"
import Genre from "../models/genre"
import { IAuthor, IGenre } from "../types/models"


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
export const bookList = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const books = await Book
      .find({}, "title author")
      .populate<{ author: IAuthor }>("author")
      .sort("title")

    // For some reason mongoose is returning some book objects
    // with author set to "null" when I use the 'sort()' method.
    // I will leave it as it is now until I find a solution for this.
    const filteredBooks = books.filter((book) => book.author !== null)

    res.render("bookList", { title: "Book List", bookList: filteredBooks })

  } catch(error: any) {
    return next(error)
  }
}

// Display detail page for a specific book.
export const bookDetail = async (
  req: Request, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id)
      .populate<{ author: IAuthor }>("author")
      .populate<{ genre: IGenre }>("genre")

    if (!book) {
      const error = new Error("Book not found")
      return next(error)
    }
    
    const instances = await BookInstance
      .find({ book: req.params.id })

    res.render("bookDetail", {
      title: book.title,
      book: book,
      bookInstances: instances
    })
  } catch (error: any) {
    return next(error)
  }
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