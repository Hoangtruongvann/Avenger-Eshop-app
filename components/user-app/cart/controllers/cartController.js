const cartM = require('../services/cartDetail')
const userM = require('../services/users')
const productM = require('../services/products')

exports.cart = async (req,res,next) =>
{
    const id = req.user.user_id;
    let products = await cartM.getOneByUSId(id);
    
    // await products.forEach(async product =>{
    //     let proDetail = await productM.getOne(product.product_id);
    //     console.log(proDetail);
    //     product = await {...product, ...proDetail};
    // })

    for (let i = 0 ; i <  products.length ;i++){
        let proDetail = await productM.getOne(products[i].product_id);
        proDetail.quantity = products[i].quantity;
        products[i] = await {...products[i], ...proDetail};
    }

    await products.forEach(value => {
        value.image_link = value['images.image_link']
    });

    let total = 0;
    for(let i = 0; i < products.length; i++) {
        total += products[i].quantity * products[i].price;
    }

    res.render('../components/user-app/cart/views/cart', {layout:'userLayout', products: products, total:total});
}

exports.add = async (req,res,next) =>  {

    if (!req.isAuthenticated()){
        return res.json({result:'redirect'})
    }

    let cart = {};
    cart.product_id = req.query.id;
    cart.user_id = req.user.user_id;
    cart.quantity = 1;
    let result = await cartM.addToCart(cart);
    if (result){
        res.json({result:'ok'})

    }
    else{
        res.json({result: 'already exist'})
    }
}

exports.remove = async (req, res, next) => {
    let response = await cartM.remove(req.params.id);
    
    res.redirect('back');
}

exports.update = async (req, res, next) => {
    let cart = await cartM.getOneByUSId(req.user.user_id);
    for (let i = 0; i < cart.length; i++) {
        let response = await cartM.update(req.user.user_id, cart[i].product_id, req.body.quantity[i])
    }
    return res.redirect('back')
}