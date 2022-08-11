import { Types } from "mongoose"

type Id = Types.ObjectId

type BookStatus = "Available" | "Maintenance" | "Loaned" | "Reserved"

export interface IGenre {
    name: string    
}

export interface IBook {
    title: string
    author: Id
    summary: string
    isbn: string 
    genre?: Id[]    
}

export interface IBookInstance {
    book: Id
    inprint: string
    status: BookStatus
    dueBack?: Date
}

export interface IAuthor {
    firstName: string
    familyName: string
    dateOfBirth?: Date
    dateOfDeath?: Date
}