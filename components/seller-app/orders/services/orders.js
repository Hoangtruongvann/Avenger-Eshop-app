const { models } = require('../../../../models');

exports.getAll = () => {
    return models.orders.findAll({ raw: true });
}
exports.getAllById = (id) => {

    return models.orders.findAndCountAll({
        include: [{
            model: models.shipcoms,
            as: "shipp_com",

        }, {
            model: models.shops,
            as: 'shop'
        }],
        where: {
            user_id: id
        },
        raw: true
    })
}