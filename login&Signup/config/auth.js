module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated())  {
            return next();
        }
        req.flash('error_msg','Log in to access premium resource!');
        res.redirect('/users/login');
    }
}