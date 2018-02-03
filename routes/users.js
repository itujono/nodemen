import express from "express"


const router = express.Router()



router.get("/login", (req, res) => {
    res.render("users/login")
})

router.get("/register", (req, res) => {
    res.render("users/register")
})


export default router