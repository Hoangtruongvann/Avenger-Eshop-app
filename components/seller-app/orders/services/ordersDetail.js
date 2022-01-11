const { models } = require('../../../../models');
const sequelize = require('sequelize');

exports.getAll = () => {
    return models.detailorders.findAll({ raw: true });
}
exports.getAllByOrderId = (id) => {
    return models.detailorders.findAll({
        include:[{
            model:models.products,
            as:'product',
            include:[
                {
                model:models.images,
                as:'images',
                where:{image_stt:1}
                },
                {
                model:models.categories,
                as:'category',
                },
                {
                    model:models.brands,
                    as:'brand'
                }
            ]
        }],
        where:{
            order_id:id
        },
        raw:true
    })
}
// exports.getAllProduct = (id) => {
//     return models.detailorders.findAll({
//         include: [{
//             model: models.products,
//             as: "product"
//         }],
//         where: {
//             product_id: id
//         },
//         raw: true
//     })
// }