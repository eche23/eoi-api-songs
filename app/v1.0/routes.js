const router = require('express').Router();
const { getSongs, getSong, deleteSong, createSong, updateSong } = require ('./controllers/songs');
const pass = require('./middlewares/auth');
const {
    logIn,
    singUp
} = require('./controllers/users')



router.get('/songs', pass.authUser, getSongs);
router.get('/songs/:_id', pass.authUser, getSong);
router.post('/songs', pass.authUser, createSong);
router.patch('/songs/:_id', pass.authUser, updateSong);
router.delete('/songs/:_id', pass.authUser, deleteSong);

router.post('/users/login', logIn);
router.post('/users/singup', singUp);


module.exports = router;