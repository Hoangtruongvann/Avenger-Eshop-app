const userM = require('../services/users')

exports.home = async (req, res, next) => {
    let accounts = await userM.getAll();
    for (let i = 0; i < accounts.length; i++) {
        accounts[i] = accounts[i].dataValues;
    }

    res.render('../components/admin/accountList/views/accountList', {layout: 'adminLayout.hbs', account:accounts})
}

exports.delete = async(req, res, next) => {
    await userM.remove(req.params.id);
    res.redirect('back');
}


