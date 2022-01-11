const orderDetailM = require('../services/ordersDetail');
const orderM = require('../services/orders');
const products = require('../../../../models/products');

exports.show = async(req, res, next) => {
    const id = req.user.user_id;
    // lay bang orders
    let shops = await orderM.getUserShop(id);

    // for (let i = 0; i < orders.length; i++) {
    //     let orderDetail = await orderDetailM.getAllByOrderId(orders[i].order_id);

    //     orders[i] = await {...orderDetail, ...orders[i] };
    // }
    let id1 = shops[0].user_shop;
    let orders0 = await orderM.getOrders(id1);
    let orders;
    for (let i = 0; i < orders0.length; i++) {
        orders = await orderM.getAllById(orders0[i].shipp_com_id, orders0[i].shop_id)
    }
    let total = 0;
    res.render('../components/seller-app/orders/views/orderList', { layout: 'sellerLayout', orders, quantity: orders.count });
}
exports.showDetail = async(req, res, next) => {
    let detail = await orderDetailM.getAllByOrderId(req.params.order_id);
    res.render('../components/seller-app/orders/views/orderDetail', { layout: 'sellerLayout',detail});
}