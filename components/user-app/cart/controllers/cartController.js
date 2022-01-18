const cartM = require('../services/cartDetail')
const userM = require('../services/users')
const productM = require('../services/products')
    // dung de hien thi don hang ra trang web
exports.cart = async(req, res, next) => {
    // id cua dang nhap
    const id = req.user.user_id;
    //nhung san pham tuong ung id nguoi dung da mua
    let products = await cartM.getOneByUSId(id);

    // await products.forEach(async product =>{
    //     let proDetail = await productM.getOne(product.product_id);
    //     console.log(proDetail);
    //     product = await {...product, ...proDetail};
    // })

    for (let i = 0; i < products.length; i++) {
        // lay ra chi tiet san pham  ( productM gom bang images + category + brand + products)
        let proDetail = await productM.getOne(products[i].product_id);
        // lay ra so luong 
        proDetail.quantity = products[i].quantity;
        // noi 2 bang  lai 
        products[i] = await {...products[i], ...proDetail };
    }


    await products.forEach(value => {
        console.log(value);
        value.image_link = value['images.image_link']

    });

    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].quantity * products[i].price;
    }

    res.render('../components/user-app/cart/views/cart', { layout: 'userLayout', products: products, total: total });
}

exports.add = async(req, res, next) => {
    let result;

    if (!req.isAuthenticated()) {
        return res.json({ result: 'redirect' })
    }

    let cart = await cartM.getOneBydoubleId(req.user.user_id, req.query.id)
    if (cart.length != 0) {
        cart = cart[0];
        cart.quantity++;
        result = await cartM.addToCart(cart);

    } else {
        cart = {};
        cart.user_id = req.user.user_id;
        cart.product_id = req.query.id;
        cart.quantity = 1;
        result = await cartM.addToCart1(cart);
    }

    // let result =null;
    if (result) {
        res.json({ result: 'ok' })

    } else {
        res.json({ result: 'already exist' })
    }
}

exports.remove = async(req, res, next) => {
    let response = await cartM.remove(req.params.id);

    res.redirect('back');
}

exports.update = async(req, res, next) => {
    let cart = await cartM.getOneByUSId(req.user.user_id);
    for (let i = 0; i < cart.length; i++) {
        let response = await cartM.update(req.user.user_id, cart[i].product_id, req.body.quantity[i])
    }
    return res.redirect('back')
}