const router = require('express').Router();

router.get('/test', function(req, res) {
    const date = {};
    const dt = new Date();
    date.hour = Date.now();
    date.day  = dt.getDate();
    return res.json(date);
});

module.exports = router;