const async = require('hbs/lib/async');
const productServices = require('../services/productSevices')

exports.listProduct =  async (req,res,next) =>{
    const products =await productServices.getAll(0,6,6);
    res.render('../components/seller-app/products/views/productList',{layout: 'sellerLayout.hbs',products});
}
exports.addProduct = (req,res,next) =>{
    res.render('../components/seller-app/products/views/addProduct',{layout: 'sellerLayout.hbs'});
}
exports.editProduct =async (req,res,next) =>{
    const id = req.params.id;
    
    const product = await productServices.getOne(id);
    const images = await productServices.getImagesProduct(id);
    res.render('../components/seller-app/products/views/editProduct',{layout: 'sellerLayout.hbs',product,images});
}
exports.updateProduct =async (req,res,next) =>{
    const products =await productServices.getAll(0,6,6);
    res.render('../components/seller-app/products/views/productList',{layout: 'sellerLayout.hbs',products});
}