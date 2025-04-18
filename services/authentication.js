const JWT = require('jsonwebtoken');

function generateToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    const token = JWT.sign(payload, process.env.YOUR_SECRET);
    return token;
};

function validateToken(token){
    const payload = JWT.verify(token, process.env.YOUR_SECRET);
    return payload;
}


module.exports = {
    validateToken,
    generateToken,
}