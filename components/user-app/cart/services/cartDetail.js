const {models} = require('../../../../models');


exports.getAll = () =>
{
    return models.detailcarts.findAll();
}

exports.getOneByUSId = (id) =>
{
    return models.detailcarts.findAll(
        {
            where:{
                user_id:id
            },
            raw : true
        });
}

exports.addToCart = async (product) =>{

    try {
        const res = await models.detailcarts.create(product);
        return res;
    } catch (error) {
        console.log('error:'+ error);
        return null;
    }
}

exports.remove = async(id)=>{
    try {
        let res = await models.detailcarts.destroy({
            where: {
                product_id : id,
            }
        })
    } catch (error) {
        console.log('error:'+ error);
        return null;
    }
    
}

