const express = require("express");
const orderRouter = express.Router();

const {verify} = require('./../auth')

const {adminStatus} = require('./../Controllers/userController')

const orderController = require("./../Controllers/orderController")


orderRouter.post('/checkout', (req, res) => {
    orderController.orderCheckout(req.body, req.headers).then(result => {
        res.send(result)
    })
})

orderRouter.get('/retrieve-orders', verify,(req, res) => {
    //if(adminStatus === true){
        orderController.retrieveOrders(req.headers).then(result => {
            res.send(result)
        })
    //}
})

module.exports = orderRouter