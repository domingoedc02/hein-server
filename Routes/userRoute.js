const express = require("express");
const router = express.Router();

const userController = require("./../Controllers/userController")

const auth = require("./../auth");

router.post('/registration', (req, res) =>{
    userController.userRegistration(req.body).then(result => res.send(result))
    //console.log(req.body.Email)
})

router.put('/set-admin', (req, res) => {
    userController.setAdmin(req.body, req.headers).then(result => res.send(result))
})

router.post('/login', (req, res) => {
    userController.userLogin(req.body).then(result => res.json(result))
})








module.exports = router