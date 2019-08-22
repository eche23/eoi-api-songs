const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const vars = require('../helpers/defaults');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        match: [vars.regexEmail],
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        match: [vars.regexPassword],
        select: false,
        required: true
    },
    name: {
        type: String,
        min: 2,
        required: true
    },
    role: {
        type: String,
        enum: [
            "ROLE_USER", 
            "ROLE_COMPANY"
        ],
        required: true
    }
});

function generateHashPassword(plainPassword){
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
};

UserSchema.pre('save', function(next){
    try {
        let user = this;
        if(!user.isModified('password')) return next();
        user.password = generateHashPassword(user.password);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, hashPassword, cd) {
    bcrypt.compare(candidatePassword, hashPassword, function (err, isMatch) {
        if (err) {
            return cd(err); 
        }
        cd(null, isMatch);
    });
};

module.exports = mongoose.model('user', UserSchema);

