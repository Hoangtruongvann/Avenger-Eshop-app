const productM = require('../services/products')
const categoryM = require('../services/category')


exports.list = async (req,res,next)=>
{
    let categories = await categoryM.getAll();
	for(let i in categories) {
		categories[i] = categories[i].dataValues
	}
	for(let i =0;i< categories.length;i++) {
		if (categories[i].parent_category){
			categories.splice(i, 1)
			i--;
		}
	}
    if (!req.query.page){
        req.query.page = 1;
    }
    let products = await productM.getAll(req.query.page - 1, 9);
    products.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:products,categories:categories})
}

exports.detail = async (req, res, next) => {
    let product = await productM.getOne(req.params.product_id);
    if (product != null) {
        product.isAvailable = false;
        if (product.quantity > 0)
            product.isAvailable = true;
    }

    let images = await productM.getImagesProduct(req.params.product_id);
    let shop = await productM.getShop(req.params.product_id);
    let relatedProducts = await productM.getRelatedProducts(product.product_id, product.category_id); 
    if (relatedProducts.length > 4) {
        relatedProducts = relatedProducts.slice(0, 5);
    } 
    let user = req.user;
    let reviews = await productM.getReviews(req.params.product_id);
    
    console.log("🚀 ~ file: productController.js ~ line 38 ~ exports.detail= ~ relatedProducts", reviews)
    
    res.render('../components/user-app/product/views/productDetail', { layout: 'userLayout', product: product, images: images, shop: shop, relatedProducts, user, reviews })
}

exports.fetching = async function (req, res, next){
    let key = req.query.key;
    let products = await productM.getAllFetch();
    let response = [];
    products.forEach(value =>{
        if (value.dataValues.product_name.toLowerCase().includes(key.toLowerCase())) {
            response.push(value.dataValues);
        }

    })
    res.json(response);
}

exports.search = async function (req, res, next){
    let categories = await categoryM.getAll();
	for(let i in categories) {
		categories[i] = categories[i].dataValues
	}
	for(let i =0;i< categories.length;i++) {
		if (categories[i].parent_category){
			categories.splice(i, 1)
			i--;
		}
	}
    let key = req.query.key;
    let products = await productM.getFull(1, 1000);
    let response = [];
    products.forEach(value =>{
        if (value.product_name.toLowerCase().includes(key.toLowerCase())) {
            response.push(value);
        }})
    response.forEach(value => {
        value.image_link = value['images.image_link']
    });
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:response, search:true,categories:categories})
    // res.json(response)
}
 