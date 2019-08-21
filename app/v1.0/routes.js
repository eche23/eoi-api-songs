const router = require('express').Router();
const { getSongs, getSong, deleteSong, createSong, updateSong } = require ('./controllers/songs');



router.get('/songs', getSongs);
router.get('/songs/:_id', getSong);
router.post('/songs', createSong);
router.patch('/songs/:_id', updateSong);
router.delete('/songs/:_id', deleteSong);


module.exports = router;