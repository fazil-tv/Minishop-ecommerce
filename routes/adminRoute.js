//  Require modules
const express = require("express");
const adminRoute = express();

// Require  Controllers
const adminController = require("../controllers/adminController");
const productController = require('../controllers/productController')
const categoryController = require('../controllers/categoryController');
const bannerController = require('../controllers/bannerController');
const couponController = require("../controllers/couponController");
const offerController = require('../controllers/offerController');

const multer = require("../middlewares/multer");
const auth = require('../middlewares/authAdmin')




adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin')


adminRoute.get("/", auth.isLogout, adminController.Signup);
adminRoute.post('/', auth.isLogout, adminController.AdminverifyLogin);

adminRoute.get("/users", auth.isLogin, adminController.loadUser);
adminRoute.get("/index", auth.isLogin, adminController.loaddashbord);

adminRoute.get('/logout', adminController.logout);

// adminRoute.get("/product",adminController.AddProduct);
adminRoute.put('/blockUser', auth.isLogin, adminController.blockUser);
adminRoute.put('/unblockUser', auth.isLogin, adminController.unblockUser);

//users
adminRoute.get('/users', auth.isLogin, adminController.users);
//product
adminRoute.get('/product', auth.isLogin, productController.Product);
//addproduct
adminRoute.get('/addproduct', auth.isLogin, productController.addproduct);
// adminRoute.post('/addproduct',multer.uploadProduct,productController.addProductspost);
adminRoute.post('/addproduct', auth.isLogin, multer.uploadProduct, productController.addProductspost);

// edit product
// adminRoute.get('/editproduct',productController.editproduct);
adminRoute.get('/editproduct', productController.editProduct);
adminRoute.post('/editproduct', multer.uploadProduct, productController.editProductpost);

//category
adminRoute.get('/category', auth.isLogin, categoryController.category);
//addcategory
adminRoute.get('/addcategory', auth.isLogin, categoryController.addcategory);
adminRoute.post('/addcategory', auth.isLogin, categoryController.addCategoryPost);

//edit category
adminRoute.put('/editcategory/:categoryId', auth.isLogin, categoryController.editcategory);
//block category and unblock
adminRoute.put('/blockCategory', auth.isLogin, categoryController.blockCategory);
adminRoute.put('/unblockCategory', auth.isLogin, categoryController.unblockCategory);
//block product
adminRoute.put('/blockProduct/:id', auth.isLogin, productController.blockProduct);

// orders
adminRoute.get("/orders", adminController.orders);



//updatestatus
adminRoute.post('/updatestatus', adminController.updatestatus);





// orderdetaile
adminRoute.get("/orderdetailes", adminController.orderdetaile);


// banner lode
adminRoute.get('/banner', auth.isLogin, bannerController.banner);


// add banner
adminRoute.get('/addbanner', auth.isLogin, bannerController.addbanner);
adminRoute.post('/addbanner', multer.uploadBanner.single('image'), bannerController.addbannerpost);

// edit banner
adminRoute.get('/editbanner', auth.isLogin, bannerController.editbanner);
adminRoute.post('/editbanner', multer.uploadBanner.single('image'), auth.isLogin, bannerController.editbannerpost);
adminRoute.patch('/listbanner', auth.isLogin, bannerController.listbanner);

// coupon
adminRoute.get('/coupon', auth.isLogin, couponController.coupon);
// addcoupon
adminRoute.get('/addcoupon', auth.isLogin, couponController.addcoupon);
adminRoute.post('/addcoupon', auth.isLogin, couponController.addcouponpost);
adminRoute.delete('/removecoupon', auth.isLogin, couponController.deletcoupon);

// sales
adminRoute.get('/sales', auth.isLogin, adminController.sales);
adminRoute.post('/salesfilter', auth.isLogin, adminController.sales);

adminRoute.post('/salesreport', auth.isLogin, adminController.salesreport);



adminRoute.get('/offer', auth.isLogin, offerController.offer);
adminRoute.get('/addoffer', auth.isLogin, offerController.addoffer);
adminRoute.post('/addoffer', auth.isLogin, offerController.postoffer);
adminRoute.delete('/removeoffer', auth.isLogin, offerController.deletoffer);
adminRoute.post('/applyoffer', auth.isLogin, offerController.applyoffer);



adminRoute.post('/categoryofferapply', auth.isLogin, offerController.applycategoryoffer);
adminRoute.patch('/removeoffer', auth.isLogin, offerController.removeoffer);
adminRoute.patch('/removecategoryoffer', auth.isLogin, offerController.removecategoryoffer);






module.exports = adminRoute;