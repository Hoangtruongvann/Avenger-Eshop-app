const async = require('hbs/lib/async');
const {models} = require('../../../../models');
const { Op } = require("sequelize");

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

exports.getFull = () =>
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
        });
}

exports.getAllFetch = (page = 0,itemPerPage = 6) =>
{
    return models.products.findAll(
        {
            attributes: [
                'product_id',
                'product_name'
              ]
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

exports.getShop = async (id) => 
{
    const product = await this.getOne(id);
    return models.shops.findOne({
        where:{shop_id: product.shop_id},
        raw:true
    })
}

exports.getRelatedProducts = async (product_id, category_id) => 
{
    return models.products.findAll({
        include : [{
            model : models.images,
            as : 'images',
            where : {
                image_stt: 1
            },
        }],
        where:{
            category_id: category_id,   
            product_id: {
                [Op.ne]: product_id
            }
        },
        raw: true
    })
}