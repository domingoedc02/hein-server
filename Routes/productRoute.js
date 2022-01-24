const express = require("express");
const router = express.Router();
const productController = require("./../Controllers/productsController")

// const mongoose = require('mongoose')
// const multer = require('multer')
// const uuid = require('uuid')
// const uuidv4 = uuid.v4()
// const sampleImage = require('./../Models/imageModel');

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

//Product Routes
router.get('/active-products', (req, res) => {
    productController.getProducts(req, res).then(result => result)
})

router.post('/get-product', (req, res) => {
    productController.searchProduct(req, res).then(result => res.json(result))
})
router.post('/get-brands', (req, res) => {
    productController.brandsProduct(req, res).then(result => res.send(result))
})
router.post('/get-both', (req, res) => {
    productController.brandCategory(req, res).then(result => res.json(result))
})
router.post('/create-product', (req,res) => {
    productController.createProduct(req.body, res ).then(result => result)
})
router.put('/update-product', (req, res ) => {
    productController.updateProduct(req.body, req.headers).then(result => res.json(result))
})

router.put('/archive-products', (req, res) => {
    productController.archiveProduct(req, req.headers).then(result => res.json(result))
})
router.put('/activate-products', (req, res) => {
    productController.activateProduct(req, req.headers).then(result => res.json(result))
})
router.delete('/delete-products', (req, res) => {
    productController.deleteProduct(req, req.headers).then(result => res.json(result))
})
router.get('/inactive-products', (req, res) => {
    productController.inActive(req, res).then(result => result)
})
router.post('/add-to-cart', (req, res) => {
    productController.addToCart(req, res).then(result => res.json(result))
})
router.post('/view-cart', (req, res) => {
    productController.viewCart(req, res).then(result => res.send(result))
})
router.put('/update-cart', (req, res) =>{
    productController.updateCart(req, res).then(result => res.json(result))
})
router.delete('/delete-cart', (req, res) => {
    productController.deleteCart(req, res).then(result => res.json(result))
})
  
//   router.post('/create-product', upload.single('image'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const sample = new sampleImage({

//         _id: new mongoose.Types.ObjectId(),
//         name: req.file.name,
//         profileImg: url + '/public/' + req.file.filename
//     });
//     sample.save().then(result => {
//         res.status(201).json({
//             message: "User registered successfully!",
//             userCreated: {
//                 _id: result._id,
//                 profileImg: result.profileImg
//             }
//         })
//     }).catch(err => {
//         console.log(err),
//             res.status(500).json({
//                 error: err
//             });
//     })
// })



module.exports = router