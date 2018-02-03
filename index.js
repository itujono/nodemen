
import express from "express"
import exphbs from "express-handlebars"
import mongoose, { Mongoose } from "mongoose"
import bodyParser from "body-parser"

const app = express()

const port = 5000


// Connect si mongoose ke MongoDB

mongoose.connect("mongodb://localhost/restfully")
    .then(() => console.log("Koneksinya keren ke DB langsung..."))
    .catch((err) => console.log(`Error kali ini dipersembahkan oleh ${err}`))



// Keluarin IdeaSchema nya

require("./models/Idea")

const Idea = mongoose.model("ideas") // Dapet dari export-an default file Idea.js ya


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get("/", (req, res) => {
    const title = "Selamat datang!"
    res.render("index", {
        title
    })
})

app.get("/about", (req, res) => {
    const title = "Ini About wak!"
    res.render("about", {
        title
    })
})


// Page Add Ideas

app.get("/ideas/add", (req, res) => {
    res.render("add")
})

app.post("/ideas", (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }
    new Idea(newUser).save().then(idea => { res.redirect("/ideas") })
})


app.listen(port, () => {
    console.log(`Udah jalan servernya ya di port ${port}, heheh.`)
})