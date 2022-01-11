class detectRole{

    isCustomer(req, res, next) {
        if (req.user.user_role === 'customer')
        {
            return next();
        }
        else
        {
            return res.redirect('/');
        }
    }

    isSeller(req, res, next) {
        if (req.user.user_role === 'seller')
        {
            return next();
        }
        else
        {
            return res.redirect('/');
        }
    }

    isAdmin(req, res, next) {
        if (req.user.user_role === 'admin')
        {
            return next();
        }
        else
        {
            return res.redirect('/');
        }
    }

}

module.exports = new detectRole();