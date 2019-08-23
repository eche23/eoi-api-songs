const dotenv = require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const UserModel = require('../models/usersModel');
const config = require('../../../config')[process.env.NODE_ENV];
const passportGoogle = require('passport-google-token').Strategy;
const userController = require('../controllers/users')

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

passport.use('all', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN
}, async(payload, done) => {
    try {
        const user = await UserModel.findOne({
            _id: payload.id
        });
        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

const authAll = passport.authenticate('all', {
    session: false
});

passport.use(new passportGoogle({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
},
function(accessToken, refreshToken, profile,done){
    console.log("FUERA");
    
    UserModel.findOne({googleId: profile.id}).then(user => {
        if(!user){
            console.log("if");
            const userNew = new UserModel();
            userNew.name = profile._json.name;
            userNew.email = profile._json.email;
            userNew.password = "Password123456";
            userNew.role = "ROLE_USER";
            userNew.googleId = profile.id;
            UserModel.create(userNew).then(user => {
                return done(null, user);
            })
        }else{
            console.log("else");
            return done(null, user)
        }
        
    }).catch(err => {
        done(err, false);
    })
        

}));

const authGoogle = passport.authenticate('google-token', {
    session: false
});

module.exports = {
    authUser,
    authCompany,
    authAll,
    authGoogle
}