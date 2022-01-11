
exports.home = (req, res, next) => {
    res.render('../components/admin/accountList/views/accountList', {layout: 'adminLayout.hbs'})
}


