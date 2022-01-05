const productsModel = require('./../Models/productsModel');
const {adminStatus} = require('./userController')
const {decode} = require('./../auth')

module.exports.getProducts = () => {
    //console.log(adminStatus());
    return productsModel.find({isActive: true}).then(result => {
        return result

    })
}

module.exports.searchProduct = (name) => {
    return productsModel.findOne({name: name}).then(result => {
        return result
    })
}

module.exports.createProduct = (reqBody,reqHeaders) => {
    let userData = decode(reqHeaders.authorization);
    //console.log(userData);
    if(userData.isAdmin === true){
        let newProduct = new productsModel({
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price
        })
        return newProduct.save().then((result, error) =>{
            if(error){
                return 'Only admin can add a product'
            }
            else{
                return 'The product is added'
            }
        })
    }
    else{
        return 'Only admin can add a product'
    }
  
}

module.exports.updateProduct = (reqBody, reqHeaders) =>{   
    let userData = decode(reqHeaders.authorization); 
    if(userData.isAdmin === true){
        let updateProducts = {
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price,
            isActive: reqBody.isActive
        }
        return productsModel.findOneAndUpdate({name: reqBody.name}, updateProducts, {new: true}).then(result => {
            return 'Updated successfully'
        })
    }
    else{
        return 'Only admin can update the products'
    }
}

module.exports.archiveProduct = (name, reqHeaders) =>{
    let userData = decode(reqHeaders.authorization);
    let archive;
    if(userData.isAdmin === true){
        archive = {
            isActive: false
        }
        return productsModel.findOneAndUpdate({name: name}, archive, {new: true}).then(result => {
            
            return 'archived successfully'
        })
    }
    else{
        return 'Only admin can archive the product'
    }
}