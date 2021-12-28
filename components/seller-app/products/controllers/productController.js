const async = require('hbs/lib/async');
const productServices = require('../services/productSevices')
const models = require('../../../../models')


//Get all product of this seller
exports.listProduct =  async (req,res,next) =>{
    const user = req.user;
    const id = user.user_shop;
    const products =await productServices.getAll(0,6,id);
    res.render('../components/seller-app/products/views/productList',{layout: 'sellerLayout.hbs',products});
}
// add a new product
exports.addProduct = (req,res,next) =>{
    res.render('../components/seller-app/products/views/addProduct',{layout: 'sellerLayout.hbs'});
}
// delete a product
exports.deleteProduct = async (req,res,next) =>
{
    const id = req.body.id;
    await productServices.delete(id);
    res.redirect('/seller/products');
}
//edit infomation of product
exports.editProduct =async (req,res,next) =>{
    const id = req.params.id;
    const product = await productServices.getOne(id);
    const images = await productServices.getImagesProduct(id);
    res.render('../components/seller-app/products/views/editProduct',{layout: 'sellerLayout.hbs',product,images});
}
//update new infomation for product
exports.updateProduct =async (req,res,next) =>{
    // const brand = await models.brand.findOrCreate({
    //     where: { brand_name: req.body.brand },
    //     defaults: {
    //       descriptions: 'Nhãn hàng mới đang được xây dựng',
    //       phone:'000000000000',
    //       email:'none'
    //     }
    //   });
    //   const category = await models.categories.findOrCreate({
    //     where: { category_name: req.body.category },
    //     defaults: {
    //         descriptions: 'Loại mới đang được xây dựng'
    //     }
    //   });
    const id = req.body.id;
	const  name  = req.body.name;
	const	price = req.body.price;
	const category =  req.body.category;
    const brand =  req.body.brand;
    const quantity = req.body.quantity;
	const	model_year = req.body.model_year;
	const descriptions = req.body.descriptions;
    await productServices.update(id,name,price,category,brand,quantity,model_year,descriptions)
    res.redirect('/seller/products');
}