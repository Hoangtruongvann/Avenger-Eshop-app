const { models } = require('../../../../models');

exports.getAll = () => {
    return models.orders.findAll({ raw: true });
}
exports.getAllById = (id, id1) => {

    return models.orders.findAll({
        include: [{
            model: models.shipcoms,
            as: "shipp_com",

        }, {
            model: models.shops,
            as: 'shop'
        }],
        where: {
            shipp_com_id: id,
            shop_id: id1
        },

        raw: true
    })
}
exports.getAllByIdOrder = (id) => {
    return models.orders.findOne({
        include: [{
                model: models.shipcoms,
                as: "shipp_com"

            }

        ],
        where: {
            order_id: id
        },
        raw: true
    });
}
exports.getUserShop = (id) => {
    return models.users.findAll({
        where: {
            user_id: id
        },
        raw: true
    });
}
exports.getOrders = (id) => {
    return models.orders.findAll({
        where: {
            shop_id: id
        },
        raw: true
    });
}