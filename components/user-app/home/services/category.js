const { models } = require('../../../../models');
const sequelize = require('sequelize')

exports.getAll = () => {
    return models.categories.findAll();
}

exports.getOneByUSId = (id) => {
    return models.categories.findAll({
        where: {
            user_id: id
        },
        raw: true
    });
}

exports.addToCart = async(product) => {

    try {
        const res = await models.categories.create(product);
        return res;
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}

exports.remove = async(id) => {
    try {
        let res = await models.categories.destroy({
            where: {
                product_id: id,
            }
        })
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}

exports.count = async(id) => {
    return models.categories.findAll({
        where: {
            user_id: id
        },
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('product_id')), 'product_quantity'],
        ],
        raw: true
    })
}

exports.update = async(user_id, product_id, quantity) => {
    return models.categories.update({ quantity: quantity }, {
        where: {
            user_id: user_id,
            product_id: product_id
        }
    })
}