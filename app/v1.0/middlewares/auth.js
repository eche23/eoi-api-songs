const dotenv = require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const UserModel = require('../models/usersModel');
const config = require('../../../config')[process.env.NODE_ENV];

passport.use('user', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN
}, async(payload, done) => {
    try {
        const user = await UserModel.findOne({
            _id: payload.id,
            role: "ROLE_USER"
        });
        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

const authUser = passport.authenticate('user', {
    session: false
});

passport.use('company', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN
}, async(payload, done) => {
    try {
        const user = await UserModel.findOne({
            _id: payload.id,
            role: "ROLE_COMPANY"
        });
        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

const authCompany = passport.authenticate('company', {
    session: false
})

module.exports = {
    authUser,
    authCompany
}