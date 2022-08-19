import { Types, Model } from "mongoose"


export type Id = Types.ObjectId

type BookStatus = "Available" | "Maintenance" | "Loaned" | "Reserved"

// Genre types
export interface IGenre {
    name: string    
}

type GenreVirtuals = {
    url: string
}

export type GenreModel = Model<IGenre, {}, {}, GenreVirtuals>

// Book types
export interface IBook {
    title: string
    author: Id
    summary: string
    isbn: string 
    genre?: Id[]    
}

type BookVirtuals = {
    url: string
}

export type BookModel = Model<IBook, {}, {}, BookVirtuals>

// BookInstance types
export interface IBookInstance {
    book: Id
    imprint: string
    status: BookStatus
    dueBack?: Date
}

type BookInstanceVirtuals = {
    url: string
    formattedDueBack: string
}

export type BookInstanceModel = Model<IBookInstance, {}, {}, BookInstanceVirtuals>

// Author types
export interface IAuthor {
    firstName: string
    familyName: string
    dateOfBirth?: Date
    dateOfDeath?: Date
}

type AuthorVirtuals = {
    name: string
    lifespan: string
    url: string
}

export type AuthorModel = Model<IAuthor, {}, {}, AuthorVirtuals>