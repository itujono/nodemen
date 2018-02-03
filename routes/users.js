import express from "express"
import bcrypt from "bcryptjs"
import passport from "passport"
import usersModel from "../models/User"
import mongoose from "mongoose";


const router = express.Router()

const User = mongoose.model("usersModel")



router.get("/login", (req, res) => {
    res.render("users/login")
})

router.get("/register", (req, res) => {
    res.render("users/register")
})

router.post("/register", (req, res) => {
    let errors = []

    if (req.body.password !== req.body.passwordRepeat) {
        errors.push({
            text: "Password tak sama loh itu"
        })
    }

    if (req.body.password.length < 6) {
        errors.push({
            text: "Mak! Kurang banyak tu wak!"
        })
    }

    if (errors.length > 0) {
        res.render("users/register", {
            errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash
                newUser.save().then(user => {
                    req.flash("successMessage", "Kamu sekarang teregistrasi kan?")
                    res.redirect("/users/login")
                }).catch(error => {
                    console.log(error)
                    return
                })
            })
        })
    }


})


export default router