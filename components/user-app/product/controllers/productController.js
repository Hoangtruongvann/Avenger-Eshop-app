const productM = require('../services/products')


exports.list = async (req, res, next) => {
    let products = await productM.getAll(page = req.query.page, itemPerPage = 6);
    products.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList', { layout: 'userLayout', products: products, total: products.length })
}

exports.detail = async (req, res, next) => {
    let product = await productM.getOne(req.params.product_id);
    if (product != null) {
        product.isAvailable = false;
        if (product.quantity > 0)
            product.isAvailable = true;
    }
    let images = await productM.getImagesProduct(req.params.product_id);
    console.log("🚀 ~ file: productController.js ~ line 17 ~ product", product)
    res.render('../components/user-app/product/views/productDetail', { layout: 'userLayout', product: product, images: images })
}
