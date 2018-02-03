import express from "express"
import path from "path"
import exphbs from "express-handlebars"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import methodOverride from "method-override"
import flash from "connect-flash"
import session from "express-session"
import ideasModel from "./models/Idea"
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
    next()
})


mongoose.connect("mongodb://localhost/idea-app")
    .then(() => console.log("MongoDB sudah terkonek dengan baik..."))

// Load IdeaModels nya
const Idea = mongoose.model("ideasModel")


// Template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
    const title = "Sempardak!",
    sub = "Tapi jangan marah dulu"

    res.render("index", { title, sub })
})

app.get("/ideas", (req, res) => {
    Idea.find({}).sort({createdAt: "desc"})
    .then(ideas => { res.render("ideas/index", { ideas }) })
})

app.get("/ideas/add", (req, res) => res.render("ideas/add"))

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

// Munculin form Edit Idea
app.get("/ideas/edit/:id", (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => res.render("ideas/edit", { idea }))
})


// Proses Edit Idea
app.put("/ideas/:id", (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        idea.title = req.body.title
        idea.description = req.body.description

        idea.save().then(updatedIdea => {
            req.flash("successMessage", "Okay! Sudin berhasil diedit wak. Heheh.")
            res.redirect("/ideas")
        })
    })
})

// Process Form
app.post("/ideas", (req, res) => {
    const newIdea = {
        title: req.body.title,
        description: req.body.description
    }

    const idea = new Idea(newIdea).save().then(idea => {
        req.flash("successMessage", "Okay! Yang kau mau sudin awak add. Heheh.")
        res.redirect("/ideas")
    })
})

// Delete Idea
app.delete("/ideas/:id", (req, res) => {
    Idea.remove({ _id: req.params.id })
    .then(() => {
        req.flash("successMessage", "Yup! Sudin berhasil ya dihapus. Heheh. Cool!")
        res.redirect("/ideas")
    })
})





const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App running di port ${port}...`))