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

exports.updateUser = (user,user_id) =>
{
    return models.users.update(user,{where:{user_id:user_id}});
}

exports.updateShop = (shop,shop_id) =>
{
    return models.shops.update(shop,{where:{shop_id:shop_id}});
}
exports.createShop = (shop) =>
{
    return models.shops.create(shop);
}

exports.countOrder = (shop_id) =>
{
    return models.orders.findAndCountAll({where:{shop_id:shop_id},raw:true})
}
exports.countProduct = (shop_id) =>
{
    return models.products.findAndCountAll({where:{shop_id:shop_id,is_active:1},raw:true})
}

exports.countReview = (shop_id) =>
{
    return models.reviews.findAndCountAll({
        include:[
            {
                model:models.products,
                as:'product',
                where:
                {
                    shop_id:shop_id    
                }
            },  
        ], 
        raw:true
    });
}
