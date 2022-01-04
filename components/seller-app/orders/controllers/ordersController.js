const orderDetailM = require('../services/ordersDetail');
const orderM = require('../services/orders');

exports.show = async(req, res, next) => {
    const id = req.user.user_id;
    // lay bang orders
    let orders = await orderM.getAllById(id);

    // for (let i = 0; i < orders.length; i++) {
    //     let orderDetail = await orderDetailM.getAllByOrderId(orders[i].order_id);

    //     orders[i] = await {...orderDetail, ...orders[i] };
    // }
    let total = 0;

    res.render('../components/seller-app/orders/views/orderList', { layout: 'sellerLayout', orders: orders.rows, quantity: orders.count });
}