
exports.home = (req, res, next) => {
    res.render('../components/admin/dashboard/views/index', {layout: 'adminLayout.hbs'})
}


