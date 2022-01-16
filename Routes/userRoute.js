const express = require("express");
const router = express.Router();

const userController = require("./../Controllers/userController")

const auth = require("./../auth");
const { verify } = require('../auth.js');

router.post('/registration', (req, res) =>{
    userController.userRegistration(req.body).then(result => res.send(result))
    //console.log(req.body.Email)
})

router.put('/set-admin', (req, res) => {
    userController.setAdmin(req.body, req.headers).then(result => res.send(result))
})

router.post('/login', (req, res) => {
    userController.userLogin(req, res).then(result => result)
})

// router.get('/details', (req, res) => {
//     userController.userDetails(req.headers, res).then(result => result)
// })








module.exports = router