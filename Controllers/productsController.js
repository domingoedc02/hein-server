const productsModel = require('./../Models/productsModel');
const cartModel = require('./../Models/CartModel');
const {adminStatus} = require('./userController')
const {decode} = require('./../auth')
// const multer = require('multer')
// const uuid = require('uuid')
// const uuidv4 = uuid.v4()

// const DIR = './public/';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4 + '-' + fileName)
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });



module.exports.getProducts = (req, res) => {
    //console.log(adminStatus());
    return productsModel.find({isActive: true}).then(result => {
        return res.status(200).json(result)

    })
}

module.exports.searchProduct = (req, res) => {
    let productId = req.body.id
    return productsModel.findOne({_id: productId}).then(result => {
        return result
    })
}
module.exports.brandsProduct = (req, res) => {
    let productBrand = req.body.brand
    return productsModel.find({brand: productBrand, isActive: true}).then(result => {
        return result
    })
}
module.exports.brandCategory = (req, res) => {
    let productBrand = req.body.brand
    let productCategory = req.body.category
    return productsModel.find({brand: productBrand, category: productCategory, isActive: true}).then(result => {
        return result
    })
}

module.exports.createProduct =  async (reqBody, res) => {
    // let userData = await decode(reqHeaders.authorization);
    // //console.log(userData);
    // if(userData.isAdmin === true){
        let  newProduct =  new productsModel({
            name: reqBody.name,
            description: reqBody.description,
            price: reqBody.price,
            img: reqBody.img,
            category: reqBody.category,
            branchType: reqBody.branchType,
            onSale: reqBody.onSale,
            brand: reqBody.brand
        })
        return  newProduct.save().then((result, error) =>{
            if(error){
                return res.json(404,`'Only admin can add a here' ${error}`)
            }
            else{
                return  res.status(200).json(`The product is added ${result}`)
            }
        })
    // }
    // else{
    //     return res.send(404,'Only admin can add a product error')
    // }
  
}

module.exports.updateProduct = (reqBody, reqHeaders) =>{   
    // let userData = decode(reqHeaders.authorization); 
    // if(userData.isAdmin === true){
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
        return productsModel.findOneAndUpdate({_id: reqBody.id}, updateProducts, {new: true}).then(result => {
            return 'Updated successfully'
        })
    }
//     else{
//         return 'Only admin can update the products'
//     }
// }

module.exports.archiveProduct = (req, reqHeaders) =>{
    // let userData = decode(reqHeaders.authorization);
    let archive;
    // if(userData.isAdmin === true){
        archive = {
            isActive: false
        }
        return productsModel.findOneAndUpdate({_id: req.body.id}, archive, {new: true}).then(result => {
            
            return 'archived successfully'
        })
    // }
//     else{
//         return 'Only admin can archive the product'
//     }
}
module.exports.activateProduct = (req, reqHeaders) =>{
    // let userData = decode(reqHeaders.authorization);
    let archive;
    // if(userData.isAdmin === true){
        archive = {
            isActive: true
        }
        return productsModel.findOneAndUpdate({_id: req.body.id}, archive, {new: true}).then(result => {
            
            return 'activate successfully'
        })
    // }
//     else{
//         return 'Only admin can archive the product'
//     }
}
module.exports.deleteProduct = (req, reqHeaders) =>{
    // let userData = decode(reqHeaders.authorization);
    let archive;
    // if(userData.isAdmin === true){
        archive = {
            isActive: true
        }
        return productsModel.findOneAndDelete({_id: req.body.id}).then(result => {
            
            return 'deleted successfully'
        })
    // }
//     else{
//         return 'Only admin can archive the product'
//     }
}

module.exports.inActive = (req, res) => {
    return productsModel.find({isActive: false}).then(result => {
        return res.status(200).json(result)

    })
}

module.exports.addToCart =  async (req, res) => {
        let  newCart =  new cartModel({
            userId: req.body.userId,
            cartItems: req.body.cartItems
        })
        return  newCart.save().then((result, error) =>{
            if(error){
                return error
            }
            else{
                return  result
            }
        })
  
}
module.exports.viewCart = (req, res) => {
    let usersId = req.body.userId
    return cartModel.find({userId: usersId}).then(result => {
        return result
    })
}
