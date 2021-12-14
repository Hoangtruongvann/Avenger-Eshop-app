
exports.list = (req,res,next)=>
{
    res.render('../components/user-app/product/views/productList')
}

exports.detail = (req,res,next)=>
{
    res.render('../components/user-app/product/views/productDetail')
}