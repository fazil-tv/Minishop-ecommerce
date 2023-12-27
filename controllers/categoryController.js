const productSchema = require("../model/productSchema");
const categorySchema = require("../model/categoryModel");



// category
const category = async (req, res) => {
    try {
        const NewCategory = await categorySchema.find({});
        console.log(" NewCategory")
        res.render("category", { NewCategory });
    } catch (error) {
        console.log(error.message);
    }
}

// addcategory
const addcategory = async (req, res) => {
    try {
        res.render("addcategory");
    } catch (error) {
        console.log(error.message);
    }
}


const addCategoryPost = async (req, res) => {
    try {
        const name = req.body.name;
        const discription = req.body.discription;
        const validData = await categorySchema.findOne({ name: name });
        if (validData) {
            res.render('addcategory', { message: "this category is already added", })
        } else {
            const NewCategory = new categorySchema({
                name: name,
                discription: discription
            })
            await NewCategory.save()
            res.redirect('/admin/category',)
        }
    } catch (error) {
        console.log(error.message)
    }
}


//block category
const blockCategory = async (req, res) => {
  
    try {
        const categoryId =req.body.categoryId;
        console.log("hiii")
        console.log(categoryId);
        await categorySchema.updateOne({ _id: categoryId }, { $set: { is_list: true } })
        
        console.log(categorySchema);
        res.status(200).json({ message: 'category blocked' })
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
}
//unblock category
const unblockCategory = async (req, res) => {
    try {
        const categoryId =req.body.categoryId;
        console.log(categoryId);
        await categorySchema.updateOne({ _id: categoryId }, { $set: { is_list: false } })
        res.status(200).json({ message: "category unblocked" });
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }

}



module.exports = {
    category,
    addcategory,
    addCategoryPost,
    blockCategory,
    unblockCategory
}

