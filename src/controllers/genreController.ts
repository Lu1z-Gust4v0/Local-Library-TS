import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { validateCreateGenre } from "../middlewares/validateFields"
import Genre from "../models/genre"
import Book from "../models/book"
import { IGenre } from "../types/models"

// Display list of all Genre.
export const genreList = async (
  req: Request, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const genres = await Genre.find()
      .sort("name")

    res.render("genreList", { title: "Genre List", genreList: genres })
  } catch (error: any) {
    return next(error)
  }
}

// Display detail page for a specific Genre.
export const genreDetail = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const genre = await Genre.findById(req.params.id)
    const sameGenreBooks = await Book.find({ genre: req.params.id })

    // TODO: Improve error handling 
    if (!genre) {
      const error = new Error("Genre not found")
      return next(error)
    }

    res.render("genreDetail", { 
      title: "Genre detail",
      genre: genre,
      books: sameGenreBooks 
    })
  } catch (error: any) {
    return next(error)
  }
}

// Display Genre create form on GET.
export const genreCreateGet = async (req: Request, res: Response): Promise<void> => {
  res.render("genreForm", { title: "Create Genre"})
}

// Handle Genre create on POST.
export const genreCreatePost = [
  // Validate and sanitize the the name field
  ...validateCreateGenre, 
  async (
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req)
      // Create a new Genre
      const genre = new Genre({ name: req.body.name })

      if (!errors.isEmpty()) {
        res.render("genreForm", {
          title: "Create Genre",
          genre,
          errors: errors.array()
        })
        return 
      }

      const duplicatedGenre = await Genre.findOne({ name: req.body.name })
      
      if (duplicatedGenre) {
        res.redirect(duplicatedGenre.url)
      }
      // Save new genre
      await genre.save()
      
      res.redirect(genre.url)
    } catch (error: any) {
      return next(error)
    }
  }
]

// Display Genre delete form on GET.
export const genreDeleteGet = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const genre = await Genre.findById(req.params.id)
    const genreBooks = await Book.find({ genre: req.params.id})

    if (!genre) res.redirect("/catalog/genres")

    res.render("genreDelete", {
      title: "Genre Delete",
      genre: genre,
      genreBooks: genreBooks
    })

  } catch (error: any) {
    next(error)
  }
}

// Handle Genre delete on POST.
export const genreDeletePost = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const genre = await Genre.findById(req.params.id)
    const genreBooks = await Book.find({ genre: req.params.id})

    if (genreBooks.length > 0) {
      res.render("genreDelete", {
        title: "Genre Delete",
        genre: genre,
        genreBooks: genreBooks
      })
    }
    await Genre.findByIdAndRemove(req.params.id)

    res.redirect("/catalog/genres")
  } catch (error: any) {
    next(error)
  }
}

// Display Genre update form on GET.
export const genreUpdateGet = async (
  req: Request, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const genre = await Genre.findById(req.params.id) 

    if (!genre) res.redirect("/catalog/genres")

    res.render("genreForm", {
      title: "Update Genre",
      genre: genre
    })

  } catch (error: any) {
    next(error)
  }
}

// Handle Genre update on POST.
export const genreUpdatePost = [
  ...validateCreateGenre, 
  async (
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req)
      const data: IGenre = req.body

      // Create a new genre with the same Id
      const genre = new Genre({
        name: data.name,
        _id: req.params.id
      })

      if(!errors.isEmpty()) {
        res.render("genreForm", {
          title: "Update Genre",
          genre: genre,
          errors: errors.array()
        })
      } 

      const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre)        

      if (!updatedGenre) {
        throw new Error("Failed to update genre")
      }

      res.redirect(updatedGenre.url)
    } catch (error: any) {
      next(error)
    }
  }
]  

