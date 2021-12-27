const {models} = require('../../../../models');


exports.getAll = (page = 0,itemPerPage = 6,shop_id) =>
{
    return models.users.findAll();
}

exports.getOne = (id) =>
{
    return models.users.findOne(
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
exports.findUserByEmail = (email) =>
{
    return models.users.findOne({
        where:{email:email},
        raw:true
    })
}
exports.findUserById = (id) =>
{
    return models.users.findOne({
        where:{user_id:id},
        raw:true
    })
}
exports.addUser = async (user) =>{
    const res = await models.users.create(user);
    return res;
}