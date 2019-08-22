const UserModel = require('../models/usersModel');
const authJWT = require('../helpers/jwt');


function singUp(req, res) {
    UserModel.create(req.body)
    .then(user => {
        let dataToken = authJWT.createToken(user);
        let userResponde = {
            acces_token: dataToken[0],
            refresh_token: authJWT.createRefreshToken(user),
            expires_in: dataToken[1],
            role: user.role
        }
        return res.status(200).send(userResponde);
    })
    .catch((err) => handdleError(err, res))
};

function logIn(req, res) {
    if(req.body.password && req.body.email){
        UserModel.findOne({
            email: req.body.email
        })
        .select("_id password")
        .exec((err, userResult) => {
            if (err || !userResult) {
                return res.status(401).send({
                    error: "LoginError"
                });
            }

            userResult.comparePassword(req.body.password, userResult.password, function (err, isMatch) {
                if (isMatch & !err) {
                    let dataToken = authJWT.createToken(userResult);
                    return res.status(200).send({
                        acces_token: dataToken[0],
                        refresh_token: authJWT.createRefreshToken(userResult),
                        expires_in: dataToken[1],
                        role: userResult.role
                    });
                }else {
                    return res.status(401).send({
                        error: "LoginError"
                    });
                }
            });
        });
    } else {
        return res.status(401).send({
            error: "BadRequest"
        });
    }
}

function handdleError(err, res){
    return res.status(400).json(err);
};

module.exports = {
    singUp,
    logIn
}