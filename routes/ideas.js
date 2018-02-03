import express from "express"
import mongoose from "mongoose"
import ideasModel from "../models/Idea"


const router = express.Router()




// Load IdeaModels nya
const Idea = mongoose.model("ideasModel")





router.get("/", (req, res) => {
    Idea.find({}).sort({createdAt: "desc"})
    .then(ideas => { res.render("ideas/index", { ideas }) })
})

router.get("/add", (req, res) => res.render("ideas/add"))


// Munculin form Edit Idea
router.get("/edit/:id", (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => res.render("ideas/edit", { idea }))
})

// Proses Edit Idea
router.put("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.delete("/:id", (req, res) => {
    Idea.remove({ _id: req.params.id })
    .then(() => {
        req.flash("successMessage", "Yup! Sudin berhasil ya dihapus. Heheh. Cool!")
        res.redirect("/ideas")
    })
})



export default router