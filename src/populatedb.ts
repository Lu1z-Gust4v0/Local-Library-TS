import {connect, Types, Model } from "mongoose"
import Book from "./models/book"
import BookInstance from "./models/bookInstance"
import Author from "./models/author"
import Genre from "./models/genre"
import { IBook, IBookInstance, IAuthor, IGenre } from "./types/models"


const createModel = async <T>(details: T, Model: Model<T>): Promise<T & {_id: Types.ObjectId}> => {
    try {
        const model = new Model(details)
        const newModel = await model.save()

        console.log(`New model: ${newModel}`)

        return newModel as T & {_id: Types.ObjectId }
    } catch (error: any) {
        throw new Error(error.message || "Unknown Error")
    }
} 

const insertModel = async <T>(list: T[], Model: Model<T>): Promise<(T & { _id: Types.ObjectId })[]> => {
    return await Promise.all(list.map(async (item) => {
        return createModel<T>(item, Model)
    }))
} 

const populateDB = async () => {
    const uri: string = "mongodb://localhost:27017/test"
    
    await connect(uri)

    const authorList: IAuthor[] = [
        { firstName: "Patrick", familyName: "Rothfuss", dateOfBirth: new Date("1973-06-06") },
        { firstName: "Ben", familyName: "Bova", dateOfBirth: new Date("1932-11-8") },
        { firstName: "Isaac", familyName: "Asimov", dateOfBirth: new Date("1920-01-02"), dateOfDeath: new Date("1992-04-06") },
        { firstName: "Bob", familyName: "Billins" },
        { firstName: "Jim", familyName: "Jones", dateOfBirth: new Date("1971-12-16") }
    ]
    const genreList: IGenre[] = [
        { name: "Fantasy" },
        { name: "Science Fiction" },
        { name: "French Poetry" }
    ]
    
    const authors = await insertModel<IAuthor>(authorList, Author)     
    const genres = await insertModel<IGenre>(genreList, Genre)       
    const bookList: IBook[] = [
            {
                title: "The Name of the Wind (The Kingkiller Chronicle, #1)",
                summary: "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
                isbn: "9781473211896",
                author: authors[0]._id,
                genre: [genres[0]._id]
            },
            {
                title: "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
                summary: "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
                isbn: "9788401352836",
                author: authors[0]._id,
                genre: [genres[0]._id]
            },
            {
                title: "The Slow Regard of Silent Things (Kingkiller Chronicle)",
                summary: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
                isbn: "9781473211896",
                author: authors[0]._id,
                genre: [genres[0]._id]
            },
            {
                title: "Apes and Angels",
                summary: "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
                isbn: "9780765379528",
                author: authors[1]._id,
                genre: [genres[1]._id]
            },
            {
                title: "Death Wave",
                summary: "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
                isbn: "9780765379504",
                author: authors[1]._id,
                genre: [genres[1]._id]
            },
            {
                title: "Test Book 1",
                summary: "Summary Book 1",
                isbn: "ISBN111111",
                author: authors[4]._id,
                genre: [genres[1]._id, genres[2]._id]
            },
            {
                title: "Test Book 2",
                summary: "Summary Book 2",
                isbn: "ISBN222222",
                author: authors[4]._id,
            }, 
    ]
    const books = await insertModel<IBook>(bookList, Book)
    const bookInstanceList: IBookInstance[] = [
            { book: books[0]._id, inprint: "London Gollancz, 2014.", status: "Available", },
            { book: books[1]._id, inprint: "Gollancz, 2011.", status: "Loaned" },
            { book: books[2]._id, inprint: "Gollancz, 2015.", status: "Available" },
            { book: books[3]._id, inprint: "New York Tom Doherty Associates, 2016.", status: "Available" },
            { book: books[3]._id, inprint: "New York Tom Doherty Associates, 2016.", status: "Available" },
            { book: books[3]._id, inprint: "New York Tom Doherty Associates, 2016.", status: "Available" },
            { book: books[4]._id, inprint: "New York, NY Tom Doherty Associates, LLC, 2015.", status: "Available" },
            { book: books[4]._id, inprint: "New York, NY Tom Doherty Associates, LLC, 2015.", status: "Maintenance" },
            { book: books[4]._id, inprint: "New York, NY Tom Doherty Associates, LLC, 2015.", status: "Loaned" },
            { book: books[0]._id, inprint: "Imprint XXX2", status: "Available"},
            { book: books[1]._id, inprint: "Imprint XXX3", status: "Available"},
    ]
    const instances = await insertModel<IBookInstance>(bookInstanceList, BookInstance)
    
    console.log("Models saved into database successfully")
}

populateDB()
.then(() => {
    console.log("Closing connection...")
    process.exit()
})
.catch(error => {
    console.log(error)
})