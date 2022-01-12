const productM = require('../services/products')
const categoryM = require('../services/category');


exports.list = async (req,res,next)=>
{
    let itemsPerPage = 6;
    let currPage = req.query.page ? req.query.page : 1;


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
    let products = await productM.getFull();
    products.forEach(value => {
        value.image_link = value['images.image_link']
    });



    let pages;
    let pageList = [];
    pages = Math.ceil(products.length / itemsPerPage) == 0 ? 1 : Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= pages; i++){
        pageList.push({num: i});
    }

    pageList[currPage - 1].active = 1;

    products = products.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

    
    let first = {}; let last =  {};
    first.page = 1;
    last.page = pages;
    if (currPage == pages){
        last.state = 'disabled';
    }else last.state = null;
    if (currPage == 1){
        first.state = 'disabled';
    }else first.state = null;
    res.render('../components/user-app/product/views/productList',{layout: 'userLayout', products:products,categories:categories,page:pageList, first:first, last:last})
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
    let products = await productM.getFull();
    let response = [];
    products.forEach(value =>{
        if (value.product_name.toLowerCase().includes(key.toLowerCase())) {
            response.push(value);
        }})
    response.forEach(value => {
        value.image_link = value['images.image_link']
    });


    let itemsPerPage = 6;
    let currPage = req.query.page ? req.query.page : 1;
    let pages;
    let pageList = [];
    pages = Math.ceil(response.length / itemsPerPage) == 0 ? 1 : Math.ceil(response.length / itemsPerPage);

    for (let i = 1; i <= pages; i++){
        pageList.push({num: i});
    }

    pageList[currPage - 1].active = 1;

    response = response.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

    
    let first = {}; let last =  {};
    first.page = 1;
    last.page = pages;
    if (currPage == pages){
        last.state = 'disabled';
    }
    if (currPage == 1){
        first.state = 'disabled';
    }
    res.render('../components/user-app/product/views/productSearch',{layout: 'userLayout', products:response,categories:categories,
page:pageList, first:first, last:last, key:{name:key}});
    // res.json(response)
}
 
exports.addReivew = async function (req, res, next) {
    if (req.user)
    {
        let date =  "";
        const d = new Date();
        date = d.getDate().toString() + '/' + (d.getMonth()+1).toString() + '/' + d.getFullYear().toString()
        console.log("us",req.body)
        await productM.addReivew(req.user.user_id, req.params.product_id, req.body, date);
        exports.detail(req, res, next);
    }
    
}