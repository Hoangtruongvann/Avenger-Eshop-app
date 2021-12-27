exports.listProduct = (req,res,next) =>{
    res.render('../components/seller-app/products/views/productList',{layout: 'sellerLayout.hbs'});
}
exports.addProduct = (req,res,next) =>{
    res.render('../components/seller-app/products/views/addProduct',{layout: 'sellerLayout.hbs'});
}
exports.editProduct = (req,res,next) =>{
    res.render('../components/seller-app/products/views/editProduct',{layout: 'sellerLayout.hbs'});
}