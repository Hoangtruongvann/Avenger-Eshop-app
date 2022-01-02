const async = require('hbs/lib/async');
const { models } = require('../../../../models');
const sequelize = require('sequelize')
const { Op } = require("sequelize");

exports.getAll = (page = 0, itemPerPage = 5, shop_id, search) => {
    if (search&&search!="")
        return models.products.findAndCountAll(
            {
                include: [{
                    model: models.images,
                    as: 'images',
                    where: {
                        image_stt: 1
                    },
                }, {
                    model: models.categories,
                    as: 'category',
                },
                {
                    model: models.brands,
                    as: 'brand'
                }],
                where: {
                    is_active: true,
                    shop_id: shop_id,
                    product_name: {
                        [Op.substring]: search,
                      },
                }
                ,
                raw: true
                , offset: page * itemPerPage, limit: itemPerPage
            });
    else
        return models.products.findAndCountAll(
            {
                include: [{
                    model: models.images,
                    as: 'images',
                    where: {
                        image_stt: 1
                    },
                }, {
                    model: models.categories,
                    as: 'category',
                },
                {
                    model: models.brands,
                    as: 'brand'
                }],
                where: {
                    is_active: true,
                    shop_id: shop_id
                }
                ,
                raw: true
                , offset: page * itemPerPage, limit: itemPerPage
            });
}

exports.getOne = (id) => {
    return models.products.findOne(
        {
            include:
                [
                    {
                        model: models.categories,
                        as: 'category',
                    },
                    {
                        model: models.brands,
                        as: 'brand'
                    }
                ],
            where: {
                is_active: true,
                product_id: id
            },
            raw: true
        });
}
exports.getImagesProduct = (id) => {
    return models.images.findAll({
        where: { product_id: id },
        raw: true
    })
}
exports.delete = (id) => {
    return models.products.update({
        is_active: false
    }, {
        where: {
            product_id: id,
        }
    });
}
exports.update = async (id, name, price, category_name, brand_name, quantity, model_year, descriptions) => {
    let brand = await models.brands.findOne({ where: { brand_name: brand_name }, raw: true });
    if (!brand)
        brand = await models.brands.create({ brand_name: brand_name, descriptions: "Thương hiệu mới đang được xây dựng.", address: "none" });
    let category = await models.categories.findOne({ where: { category_name: category_name }, raw: true });
    if (!category)
        category = await models.categories.create({ category_name: category_name, descriptions: "Loại sản phẩm mới." });
    return models.products.update({
        product_name: name,
        price: price,
        brand_id: brand.brand_id,
        category_id: category.category_id,
        quantity: quantity,
        model_year: model_year,
        descriptions: descriptions,
    }, {
        where: {
            product_id: id,
        }
    });

}