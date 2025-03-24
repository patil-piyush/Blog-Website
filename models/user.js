const { Schema, model, default: mongoose } = require('mongoose');
const crypto = require('crypto');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    profileImageURL: {
        type: String,
        default: "../public/images/default.jpg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },

}, { timestamps: true });



userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found!!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = crypto.createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword !== userProvidedHash)
        throw new Error("Wrong Password!!");

    const token = generateToken(user);
    return token;
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto.createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});


const User = model("user", userSchema);

module.exports = User;