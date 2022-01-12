const { models } = require('../../../../models');
const sequelize = require('sequelize');
const detailcarts = require('../../../../models/detailcarts');

exports.getAll = () => {
    return models.detailcarts.findAll();
}

exports.getOneByUSId = (id) => {
    return models.detailcarts.findAll({
        where: {
            user_id: id
        },
        raw: true
    });
}

exports.getOneBydoubleId = (Uid,Pid) => {
    return models.detailcarts.findAll({
        where: {
            user_id: Uid
            ,product_id: Pid
        },
        raw: true
    });
}

exports.addToCart = async(product) => {

    try {
        const res = await models.detailcarts.update(product,{where: {
            product_id: product.product_id
          }});
        return res;
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}
exports.addToCart1 = async(product) => {

    try {
        const res = await models.detailcarts.create(product);
        return res;
    } catch (error) {
        console.log('error:' + error);
        return null;
    }
}

exports.remove = async(id) => {
    try {
        let res = await models.detailcarts.destroy({
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
    return models.detailcarts.findAll({
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
    return models.detailcarts.update({ quantity: quantity }, {
        where: {
            user_id: user_id,
            product_id: product_id
        }
    })
}