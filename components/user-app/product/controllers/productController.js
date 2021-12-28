const productM = require('../services/products')


exports.list = async (req,res,next)=>
{
    let products = await productM.getAll(page = req.query.page, itemPerPage = 6);
    products.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:products, total:products.length})
}

exports.detail = (req,res,next)=>
{
    res.render('../components/user-app/product/views/productDetail',{layout: 'userLayout'})
}