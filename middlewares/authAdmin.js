
const isLogin = async (req, res, next) => {

    try {
        if (req.session.admin_email) {
            
            next();
        } else {
            res.redirect('/admin');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/admin');
    }



}

const isLogout = async (req, res, next) => {

    try {

        if (req.session.admin_email) {
            res.redirect('/admin');
        } else {
            next();
        }

    } catch (error) {

        console.log(error.message);

    }
}

module.exports = {
    isLogin,
    isLogout
}