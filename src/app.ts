import express, { Express } from "express"
import cookieParser from "cookie-parser"
import { connect } from "mongoose"
import path from "path"
import { indexRoutes } from "./routes"
import { usersRoutes } from "./routes/users"
import { catalogRoutes } from "./routes/catalog"

const app: Express = express()
const PORT: number = 3000
const uri: string = "mongodb://localhost:27017/test"


// view engine setup 
app.set("views", path.join(__dirname, "../../", "views"))
app.set("view engine", "pug")

// Parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, "../../", "public")))

// routes
app.use("/", indexRoutes)
app.use("/users", usersRoutes)
app.use("/catalog", catalogRoutes)

connect(uri).then(() => {
    app.listen(PORT, () => {
        console.log("[server]: Server listening at http://localhost:3000")
    })
}).catch(error => {
    throw error
})