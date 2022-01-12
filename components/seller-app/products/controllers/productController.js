const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

const async = require('hbs/lib/async');
const productServices = require('../services/productSevices')
const { models } = require('../../../../models')
const multer = require('multer');
const path = require('path');
//setting cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//Get all product of this seller
exports.listProduct = async (req, res, next) => {
    try {
        const user = req.user;
        const id = user.user_shop;
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const itemPerPage = 4;
        const search_name = req.query.key;
        console.log(req.query.key);
        const products = await productServices.getAll(page, itemPerPage, id, search_name);
        const pages = Math.ceil(products.count / itemPerPage);
        res.render('../components/seller-app/products/views/productList', { layout: 'sellerLayout.hbs', products: products.rows, pages, search_name, page, next: page < pages - 1 ? page + 2 : pages, prev: page >= 1 ? page : 1 });
    }
    catch (error) {
        next(error);
    }
}
// add a new product
exports.addProduct = (req, res, next) => {
    res.render('../components/seller-app/products/views/addProduct', { layout: 'sellerLayout.hbs' });
}
//create a product
exports.createProduct = (req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
            } else {
                const newProduct = (await productServices.addProduct({
                    product_name: fields.name,
                    price: fields.price,
                    category: fields.category,
                    descriptions: fields.descriptions,
                    brand: fields.brand,
                    quantity: fields.quantity,
                    model_year: fields.model_year,
                    shop_id: req.user.user_shop
                })).get({ plain: true });


                const image = [];

                if (files.product_img1) {
                    await cloudinary.uploader.upload(files.product_img1['filepath'], {
                        folder: 'products',
                    },
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                image.push(result.url);
                            }
                        });
                }

                if (files.product_img2) {
                    await cloudinary.uploader.upload(files.product_img2['filepath'], {
                        folder: 'products',
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            image.push(result.url);
                        }
                    });
                }

                if (files.product_img3) {
                    await cloudinary.uploader.upload(files.product_img3['filepath'], {
                        folder: 'products',
                    },
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                image.push(result.url);
                            }
                        });
                }
                image.forEach(async (item, index) => {
                    await models.images.create({
                        product_id: newProduct.product_id,
                        image_stt: index + 1,
                        image_link: item
                    });
                });

                //req.flash('success', 'Thêm sản phẩm thành công');
                res.redirect('/seller/products?message=create=success');
            }
        });
    } catch (err) {
        next(err);
    }
}
// delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await productServices.delete(id);
        res.redirect('/seller/products');
    }
    catch (error) {
        next(error);
    }
}
//edit infomation of product
exports.editProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productServices.getOne(id);
        const images = await productServices.getImagesProduct(id);
        res.render('../components/seller-app/products/views/editProduct', { layout: 'sellerLayout.hbs', product, images });
    }
    catch (error) {
        next(error);
    }
}
//update new infomation for product
exports.updateProduct = async (req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
            } else {
                console.log(fields)
                const id = fields.id;
                const name = fields.name;
                const price = fields.price;
                const category = fields.category;
                const brand = fields.brand;
                const quantity = fields.quantity;
                const model_year = fields.model_year;
                const descriptions = fields.descriptions;
                await productServices.update(id, name, price, category, brand, quantity, model_year, descriptions)

                const image = [];

                if (files.product_img1.size != 0) {
                    await cloudinary.uploader.upload(files.product_img1['filepath'], {
                        folder: 'products',
                    },
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                image.push(result.url);
                            }

                        }


                    );
                } else {
                    image.push(0);
                }

                if (files.product_img2.size != 0) {
                    await cloudinary.uploader.upload(files.product_img2['filepath'], {
                        folder: 'products',
                    }, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            image.push(result.url);
                        }
                    });
                } else {
                    image.push(0);
                }
                if (files.product_img3.size != 0) {
                    await cloudinary.uploader.upload(files.product_img3['filepath'], {
                        folder: 'products',
                    },
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                image.push(result.url);
                            }
                        });
                } else {
                    image.push(0);
                }


                image.forEach(async (item, index) => {
                    if (item != 0) {
                        console.log(index + 1)
                        await models.images.update({
                            image_link: item,
                        }, {
                            where: {
                                product_id: id,
                                image_stt: index + 1
                            }
                        }

                        );
                    }
                });
            }
            res.redirect('/seller/products?update=success');
        });



    } catch (err) {
        next(err);
    }
}