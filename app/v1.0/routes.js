const router = require('express').Router();
const { getSongs, getSong, deleteSong, createSong, updateSong } = require ('./controllers/songs');



router.get('/test', getSongs);
router.get('/test:_id', getSong);
router.post('/test', createSong);
router.patch('/test:_id', updateSong);
router.delete('/test:_id', deleteSong);


module.exports = router;