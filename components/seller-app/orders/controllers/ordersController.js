const orderDetailM = require('../services/ordersDetail');
const orderM = require('../services/orders');
const products = require('../../../../models/products');
const async = require('hbs/lib/async');

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
    console.log(detail);
    res.render('../components/seller-app/orders/views/orderDetail', { layout: 'sellerLayout', detail });
}
exports.editOrders = async(req, res, next) => {
    const id = req.params.order_id;
    let order = await orderM.getAllByIdOrder(id);
    console.log(order);
    res.render('../components/seller-app/orders/views/editOrders', { layout: 'sellerLayout', order });
}
exports.updateOrders = async(req, res, next) => {
    // const form = formidable({ multiples: true });

    // form.parse(req, async(err, fields, files) => {
    //     console.log(fields);
    //     const id = fields.order_id;
    //     const name = fields.name;
    //     const price = fields.price;
    //     const category = fields.category;
    //     const brand = fields.brand;
    //     const quantity = fields.quantity;
    //     const model_year = fields.model_year;
    //     const descriptions = fields.descriptions;
    //     await orderM.update(id, name, price, category, brand, quantity, model_year, descriptions)
    // });
    let id = req.id;



}