

exports.home = (req, res,next) =>
{
    res.render('../components/seller-app/dashboard/views/dashboard',{layout: 'sellerLayout'});
}

