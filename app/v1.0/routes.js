const router = require('express').Router();
const { getSongs, getSong, deleteSong, createSong, updateSong } = require ('./controllers/songs');
const pass = require('./middlewares/auth');
const {
    logIn,
    singUp,
    googleSignUp
} = require('./controllers/users')



router.get('/songs', pass.authAll, getSongs);
router.get('/songs/:_id', pass.authUser, getSong);
router.post('/songs', createSong);
router.patch('/songs/:_id', pass.authUser, updateSong);
router.delete('/songs/:_id', pass.authUser, deleteSong);

router.post('/login', logIn);
router.post('/singup', singUp);

router.get('/users/detail', pass.authAll, function(req, res){
    res.status(200).send(req.user);
});

router.post('/auth/google', pass.authGoogle, googleSignUp);


module.exports = router;