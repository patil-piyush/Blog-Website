const {validateToken} = require('../services/authentication');

function checkAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if(!tokenCookieValue) return next();

        try {
            const payLoad = validateToken(tokenCookieValue);
            req.user = payLoad;
        } catch (error) {}

        return next();
    };
};


module.exports = {
    checkAuthenticationCookie,
}