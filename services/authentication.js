const JWT = require('jsonwebtoken');

const secret = process.env.YOUR_SECRET;

function generateToken(user){
    const payload = {
        id: user.id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    const token = JWT.sign(payload, secret);
    return token;
};

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}


module.exports = {
    validateToken,
    generateToken,
}