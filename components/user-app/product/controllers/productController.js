const productM = require('../services/products')


exports.list = async (req,res,next)=>
{
    if (!req.query.page){
        req.query.page = 1;
    }
    let products = await productM.getAll(req.query.page - 1, 9);
    products.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:products})
}

exports.detail = (req,res,next)=>
{
    res.render('../components/user-app/product/views/productDetail',{layout: 'userLayout'})
}

exports.fetching = async function (req, res, next){
    let key = req.query.key;
    let products = await productM.getAllFetch();
    let response = [];
    products.forEach(value =>{
        if (value.dataValues.product_name.toLowerCase().includes(key.toLowerCase())) {
            response.push(value.dataValues);
        }

    })
    res.json(response);
}

exports.search = async function (req, res, next){
    let key = req.query.key;
    let products = await productM.getFull(1, 1000);
    let response = [];
    products.forEach(value =>{
        if (value.product_name.toLowerCase().includes(key.toLowerCase())) {
            response.push(value);
        }})
    response.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:response, search:true})
    // res.json(response)
}
