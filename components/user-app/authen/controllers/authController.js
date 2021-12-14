

exports.login  =(req,res,next) =>
{
    res.render('../components/user-app/authen/views/login')
}

exports.profile  =(req,res,next) =>
{
    res.render('../components/user-app/authen/views/profile')
}
