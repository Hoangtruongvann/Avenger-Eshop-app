const categoryM = require('../services/category')
const productM = require('../services/products')

exports.home = async (req, res, next) => {
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

	if(req.user){
		if (req.user.user_role == 'seller')
			return res.redirect('/seller')
		else if (req.user.user_role == 'customer'){
			return  res.render('../components/user-app/home/views/homepage',{layout: 'userLayout.hbs', categories: categories});
		}
	}
	res.render('../components/user-app/home/views/homepage',{layout: 'userLayout.hbs',categories: categories});
}

exports.category = async(req, res, next)=>{
	const id = req.params.id;
	let idList = [];
	let products = [];
	let categories = await categoryM.getAll();
	for(let i in categories) {
		categories[i] = categories[i].dataValues
	}
	for(let i =0;i< categories.length;i++) {
		if (categories[i].parent_category && categories[i].parent_category == id){
			idList.push(categories[i].category_id);
		}
		if (categories[i].parent_category){
			categories.splice(i, 1)
			i--;
		}
	}
	for(let i = 0; i < idList.length; i++){
		let product = await productM.getOneByCategory(idList[i]);
		products = products.concat(product);
	}
	products.forEach(value => {
        value.image_link = value['images.image_link']
    });
	res.render('../components/user-app/home/views/productList',{layout: 'userLayout',categories, products:products, search:true})
}