const productSchema = require("../model/productSchema");
const userSchema = require("../model/userSchema");
const categorySchema = require("../model/categoryModel");
const path = require("path")


const multer = require("multer")
const sharp = require('sharp');
const { log } = require("console");






// product
const Product = async (req, res) => {
    try {
        const users = await productSchema.find({});
        res.render("product", { product: users });
    } catch (error) {
        console.log(error.message);
    }
}

// addproduct
const addproduct = async (req, res) => {

    const datas = await categorySchema.find({})

// Render the addproductand  view and pass the categorys data
    const categorys = await categorySchema.find({});
    try {
        res.render("addproduct", { datas,categorys });
    } catch (error) {
        console.log(error.message);
    }
}

//product post
const addProductspost = async (req, res) => {

    try {
        const requestData = req.body
        console.log(requestData);
        const uploadedFiles = req.files;
        console.log("check:", uploadedFiles);

        const img = [
            uploadedFiles && uploadedFiles.image1 ? uploadedFiles.image1[0].filename : null,
            uploadedFiles && uploadedFiles.image2 ? uploadedFiles.image2[0].filename : null,
            uploadedFiles && uploadedFiles.image3 ? uploadedFiles.image3[0].filename : null,
            uploadedFiles && uploadedFiles.image4 ? uploadedFiles.image4[0].filename : null,
        ];

        for (let i = 0; i < img.length; i++) {
            if (img[i]) {
                await sharp('public/multerimg/' + img[i])
                    .resize(500, 500)
                    .toFile('public/sharpimg/' + img[i])
            }
        }
        if (requestData.quantity > 0 && requestData.price > 0) {
            console.log("vennu njan");
            const product = new productSchema({
                name: requestData.title,
                quantity: requestData.quantity,
                category: requestData.category,
                price: requestData.price,
                offer: requestData.offer,
                description: requestData.description,
                "images.image1": uploadedFiles.image1[0].filename,
                "images.image2": uploadedFiles.image2[0].filename,
                "images.image3": uploadedFiles.image3[0].filename,
                "images.image4": uploadedFiles.image4[0].filename,
            })
            console.log("veendum vennu njan");
            await product.save()
            console.log(product);
            res.redirect('/admin/product');
        }
    } catch (error) {
        console.log(error.message)
    }
}

//block product
const blockProduct = async (req, res) => {
    console.log("kkkk")

    try {  
        const productId = req.params.id;
        console.log(productId);
        const productvalue = await productSchema.findOne({ _id: productId});
        console.log(productvalue)

        if(productvalue){
            if(productvalue.is_blocked){
                await productSchema.updateOne({_id:productId}, {$set:{ is_blocked:false}});
                res.status(200).json({ message:"Product unblocked successfully"});
            }else{
                await productSchema.updateOne({_id:productId}, {$set:{is_blocked:true}});
                res.status(200).json({message:"Product blocked successfully"});

            }
        }else{
            res.status(404).json({message:"Product not found"});
        }


    } catch(error){
        console.error("Error:",error.message);
        res.status(500).json({ message:"Internal server error"});
    }
};


// // Validate category existence before creating the product
// const categoryExists = await Category.findById(requestData.category);
// if (!categoryExists) {
//     console.error('Invalid category ID');
//     // Handle the error appropriately
//     return res.status(400).send('Invalid category ID');
// }


module.exports = {
    Product,
    addproduct,
    addProductspost,
    blockProduct
}