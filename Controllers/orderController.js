
const orderModel = require('./../Models/orderModel');
const {decode} = require('./../auth');
//const prodModel = require('./../Models/productsModel');



module.exports.orderCheckout = (reqBody, reqHeaders) => {
    let userData = decode(reqHeaders.authorization);
    //if(userData.isAdmin === false){
    let cart = reqBody
    let total = 0
    let seller = [];
    //console.log(cart['price'])
    function compute(amount){
        return total += parseInt(amount);
    }

    for(let i = 0; i < cart.length; i++){
        let amount = cart[i]['price'];
        compute(amount);
        seller.push(cart[i]['seller'])
        
    }
    //console.log(seller)
        
    
        let newOrder = new orderModel({
            totalAmount: total,
            associateWith: {
                owner: seller
            }
        })
        return newOrder.save().then(result =>{

            return 'Your order is successfully processed'
            
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
