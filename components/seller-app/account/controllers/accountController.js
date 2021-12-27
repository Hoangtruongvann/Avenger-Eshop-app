
exports.profile = (req,res,next) =>{
    res.render('../components/seller-app/account/views/profile',{layout: 'sellerLayout.hbs'});
}