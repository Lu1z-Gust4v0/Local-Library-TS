import { Types } from "mongoose"

type Id = Types.ObjectId

export interface IGenre {
    name: string    
}

export interface IBook {
    title: string
    author: Id
    summary: string
    ISBN: string 
    genre: Id[]    
}

export interface IBookInstance {
    book: Id
    inprint: string
    status: string
    dueBack: Date
}

export interface IAuthor {
    firstName: string
    familyName: string
    dateOfBirth: Date
    dateOfDeath?: Date
}