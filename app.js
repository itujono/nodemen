import express from "express"
import path from "path"
import exphbs from "express-handlebars"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import flash from "connect-flash"
import session from "express-session"
import db from "./config/database"
import ideas from "./routes/ideas"
import users from "./routes/users"
import { read } from "fs";


const app = express()

// Serve static files dan assets
app.use("/static", express.static(path.join(__dirname, "public")))



// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride("_method"))
app.use(flash())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    res.locals.successMessage = req.flash("successMessage")
    res.locals.errorMessage = req.flash("errorMessage")
    res.locals.error = req.flash("error")
    next()
})





mongoose.connect(db.mongoURI)
    .then(() => console.log("MongoDB sudah terkonek dengan baik..."))



// Template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
    const title = "Sempardak!",
    sub = "Tapi jangan marah dulu"

    res.render("index", { title, sub })
})



app.get("/about", (req, res) => {
    const title = "Ini adalah About page",
    version = "1.0.0"

    res.render("about", {
        title, version
    })
})

app.get("/contact", (req, res) => {
    const hape = "08122348342",
    nama = "Rino Gunawan"

    res.render("contact", {
        nama, hape
    })
})


// Load router penggantinya
app.use("/ideas", ideas)
app.use("/users", users)





const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App running di port ${port}...`))