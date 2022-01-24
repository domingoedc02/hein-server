
const orderModel = require('./../Models/orderModel');
const {decode} = require('./../auth');
//const prodModel = require('./../Models/productsModel');



module.exports.orderCheckout = (reqBody, reqHeaders) => {
    // let userData = decode(reqHeaders.authorization);
    // //if(userData.isAdmin === false){
    // let cart = reqBody
    // let total = 0
    // let seller = [];
    // //console.log(cart['price'])
    // function compute(amount){
    //     return total += parseInt(amount);
    // }

    // for(let i = 0; i < cart.length; i++){
    //     let amount = cart[i]['price'];
    //     compute(amount);
    //     seller.push(cart[i]['seller'])
        
    // }
    //console.log(seller)
        let name = reqBody.name
        let price = reqBody.price
        let total = reqBody.totalAmount
        let username = reqBody.username
        let newOrder = new orderModel({
            totalAmount: total,
            name: name,
            price: price,
            associateWith: {
                buyer: username
            }
        })
        return newOrder.save().then(result =>{
            return result
            
        })
    //}
    //else{
        return 'Only customers can checkout orders'
    //}
}

module.exports.retrieveOrders = (reqHeaders) => {
    let userData = decode(reqHeaders.authorization);
    if(userData.isAdmin === true){
        return orderModel.find().then(result => {
            return result
        })
    }
    else{
        return 'Only admin can retrieve orders'
    }
}
