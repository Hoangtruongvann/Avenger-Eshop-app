const orderM = require('../services/ordersDetail');
const sellerM = require('../services/sellers');
const productM = require('../services/products');

exports.show = async(req, res, next) => {
    const id = req.user.user_id;
    let orders = await orderM.getOneByORId(id);
    res.render('../components/seller-app/orders/views/orderList', { layout: 'sellerLayout', orders: orders });


}