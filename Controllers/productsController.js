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

module.exports.createProduct =   async (req, res ,reqHeaders, reqBody) => {
    let userData = await decode(reqHeaders.authorization);
    //console.log(userData);
    if(userData.isAdmin === true){
        let  newProduct =  new productsModel({
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price,
            img: reqBody.img,
            category: reqBody.category,
            branchType: reqBody.branchType,
            onSale: reqBody.onSale
        })
        return  newProduct.save().then((result, error) =>{
            if(error){
                return res.send(404,`'Only admin can add a here' ${error}`)
            }
            else{
                return  res.status(200).send(`The product is added ${result}`)
            }
        })
    }
    else{
        return res.send(404,'Only admin can add a product error')
    }
  
}

module.exports.updateProduct = (reqBody, reqHeaders) =>{   
    let userData = decode(reqHeaders.authorization); 
    if(userData.isAdmin === true){
        let updateProducts = {
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price,
            isActive: reqBody.isActive,
            onSale: reqBody.onSale,
            category: reqBody.category,
            img: reqBody.img,
            branchType: reqBody.branchType
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

