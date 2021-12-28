const {models} = require('../../../../models');


exports.getAll = (page = 0,itemPerPage = 6) =>
{
    return models.products.findAll(
        {
            include : [{
                model : models.images,
                as : 'images',
                where : {
                    image_stt: 1
                },
            },{
                model : models.categories,
                as : 'category',
            },
            {
            model: models.brands,
            as:'brand'
            }]
            ,
            raw : true
            ,offset:page*itemPerPage,limit:itemPerPage
        });
}

exports.getOne = (id) =>
{
    return models.products.findOne(
        {
            include : 
            [
                {
                model : models.categories,
                as : 'category',
                },
                {
                model: models.brands,
                as:'brand'
                }   
            ],
            where:{
                is_active:true,
                product_id:id
            },
            raw : true
        });
}
exports.getImagesProduct = (id) =>
{
    return models.images.findAll({
        where:{product_id:id},
        raw:true
    })
}
exports.getOneImageProduct = (id) =>
{
    return models.images.findOne({
        where:{product_id:id},
        raw:true
    })
}