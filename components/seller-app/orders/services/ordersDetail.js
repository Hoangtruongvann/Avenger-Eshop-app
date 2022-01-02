const { models } = require('../../../../models');
const sequelize = require('sequelize');

exports.getAll = () => {
    return models.detailorders.findAll({ raw: true });
}
exports.getAllByOrderId = (id) => {
    return models.detailorders.findAll({
        where: {
            order_id: id
        },
        raw: true
    })
}