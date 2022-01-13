const userM = require('../services/users')

exports.home = async (req, res, next) => {
    let accounts = await userM.getAll();
    for (let i = 0; i < accounts.length; i++) {
        accounts[i] = accounts[i].dataValues;
        if(accounts[i].user_role == 'admin') {
            accounts.splice(i, 1);
            i--;
        }
    }
    var sumary = {a:accounts.length, b:0,c:0}

    accounts.forEach(value=>{
        if(value.is_blocked)
        {
            sumary.b ++;
        }else{sumary.c ++;}
    })

    let itemsPerPage = 6;
    let currPage = req.query.page ? req.query.page : 1;
    let pages;
    let pageList = [];
    pages = Math.ceil(accounts.length / itemsPerPage) == 0 ? 1 : Math.ceil(accounts.length / itemsPerPage);

    for (let i = 1; i <= pages; i++){
        pageList.push({num: i});
    }

    pageList[currPage - 1].active = 1;

    accounts = accounts.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage);

    
    let first = {}; let last =  {};
    first.page = 1;
    last.page = pages;
    if (currPage == pages){
        last.state = 'disabled';
    }
    if (currPage == 1){
        first.state = 'disabled';
    }




    res.render('../components/admin/accountList/views/accountList', {layout: 'adminLayout.hbs', account:accounts, page:pageList, first:first, last:last, sumary:sumary});
} 

exports.lock = async (req, res, next) => {
    await userM.update(req.params.id, 1)
    res.redirect('back')
}

exports.unlock = async (req, res, next) => {
    await userM.update(req.params.id, 0)
    res.redirect('back')
}

exports.delete = async(req, res, next) => {
    await userM.remove(req.params.id);
    res.redirect('back');
}


