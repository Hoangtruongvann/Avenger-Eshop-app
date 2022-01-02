const { models } = require('../../../../models');
const sequelize = require('sequelize');

exports.getAll = () => {
    return models.detailorders.findAll({ raw: true });
}
exports.getOneByORId = (id) => {
    return models.detailorders.findAll({
        where: {
            order_id: id
        },
        raw: true
    })
}
exports.addToOrder = async(Order) => {
    try {
        const res = await models.detailorders.create(Order);
        return res;
    } catch (error) {
        console.log('Error' + error);
        return null;
    }
}
exports.remove = async(id) => {
    try {
        let res = await models.detailorders.destroy({
            where: {
                order_id: id
            }
        })
    } catch (error) {
        console.log("Error" + error);
        return null;
    }
}
exports.count = async(id) => {
    return models.detailorders.findAll({
        where: {
            order_id: id
        },
        // tai sao lai la product_quantity
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('product_id')), 'product_quantity']
        ],
        raw: true
    })
}
exports.update = async(order_id, product_id, quantity) => {
    return models.detailorders.update({ quantity: quantity }, {
        where: {
            user_id: user_id,
            product_id: product_id
        }
    })

}