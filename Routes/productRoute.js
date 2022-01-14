const express = require("express");
const router = express.Router();
const productController = require("./../Controllers/productsController")

//Product Routes
router.get('/active-products', (req, res) => {
    productController.getProducts().then(result => res.send(result))
})

router.get('/get-product', (req, res) => {
    productController.searchProduct(req.body.name).then(result => res.send(result))
})
router.post('/create-product', (req,res) => {
    productController.createProduct(req.body, req.headers, res).then(result => res.send(result))
})
router.put('/update-product', (req, res) => {
    productController.updateProduct(req.body, req.headers).then(result => res.send(result))
})

router.put('/archive-products', (req, res) => {
    productController.archiveProduct(req.body.name, req.headers).then(result => res.send(result))
})

module.exports = router