const express = require("express");
const router = express.Router();

const userController = require("./../Controllers/userController")
const productController = require("./../Controllers/productsController")
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


//Product Routes
router.get('/active-products', (req, res) => {
    productController.getProducts().then(result => res.send(result))
})

router.get('/get-product', (req, res) => {
    productController.searchProduct(req.body.name).then(result => res.send(result))
})
router.post('/create-product', (req,res) => {
    productController.createProduct(req.body, req.headers).then(result => res.send(result))
})
router.put('/update-product', (req, res) => {
    productController.updateProduct(req.body, req.headers).then(result => res.send(result))
})
router.put('/archive-products', (req, res) => {
    productController.archiveProduct(req.body.name, req.headers).then(result => res.send(result))
})





module.exports = router