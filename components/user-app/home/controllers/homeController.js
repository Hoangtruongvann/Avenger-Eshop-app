
exports.home = (req, res, next) => {
	if(req.user){
		if (req.user.user_role == 'seller')
			return res.redirect('/seller')
		else if (req.user.user_role == 'customer')
			return  res.render('../components/user-app/home/views/homepage',{layout: 'userLayout.hbs'});
	}
	res.render('../components/user-app/home/views/homepage',{layout: 'userLayout.hbs'});
}