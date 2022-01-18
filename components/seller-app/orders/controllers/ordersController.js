const orderDetailM = require('../services/ordersDetail');
const orderM = require('../services/orders');
const products = require('../../../../models/products');
const async = require('hbs/lib/async');
const formidable = require('formidable');
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

    const id=req.user.user_id;
    const shop=  await orderM.getUserShop(id);
    const order = await orderM.getOrders(shop[0].user_shop);
    const order_id=order[0].order_id; 
    let detail = await orderDetailM.getAllByOrderId(req.params.order_id);
    let itemPerpage = 2;
    let currPage =req.query.page!=null ? req.query.page :1;
    // di tu 1-> n tai vi the ocon so duoc hien 
    let pages= Math.ceil(detail.length/itemPerpage)==0? 1:Math.ceil(detail.length/itemPerpage);
    let pageList = []
    for(let i=1;i<=pages;i++)
    {
        pageList.push({num:i});
    }
    pageList[currPage-1].active=1;
    for(let i=0;i<pageList.length;i++)
    {
        pageList[i].order_id=order_id;
    }
    let first={}; let last={};
    first.page=1;
    last.page=pages;
    first.order_id=order_id;
    last.order_id=order_id;
    first.state = currPage==1?'disabled':null;
    last.state = currPage==pages?'disabled':null;
    detail=detail.slice((currPage-1)*itemPerpage,(currPage)*itemPerpage);

  
    res.render('../components/seller-app/orders/views/orderDetail', { layout: 'sellerLayout', detail:detail,first:first,last:last, page:pageList, order_id: order_id });
}
exports.editOrders = async(req, res, next) => {
    const id = req.params.order_id;
    let order = await orderM.getAllByIdOrder(id);
    res.render('../components/seller-app/orders/views/editOrders', { layout: 'sellerLayout', order });
}
exports.updateOrders = async(req, res, next) => {

    const form = formidable({ multiples: true });

    form.parse(req, async(err, fields, files) => {
        console.log(fields);
        const order_id = fields.id;
        const order_date = fields.name;
        const order_total_price = fields.price;
        const order_status = fields.status;
        const order_brand = fields.brand;


        await orderM.update(order_id, order_date, order_total_price, order_status, order_brand);
    });
    res.redirect('/seller/orders?update=success');


}