const {models} = require('../../../../models');
const { getAll } = require('../../products/services/productSevices');


exports.getShop = (id) =>
{
    return models.shops.findOne({
        where:{
            shop_id:id
        }
        ,raw:true
    })
}