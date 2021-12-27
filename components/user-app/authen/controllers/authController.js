const userM = require('../../../../models/users')

exports.login  = async(req,res,next) =>
{
    let users = await userM.findAll();
    console.log(users);

    
    res.render('../components/user-app/authen/views/login', {layout:'userLayout'})
}

exports.profile  =(req,res,next) =>
{
    res.render('../components/user-app/authen/views/profile')
}
