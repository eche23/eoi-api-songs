const SongModel = require('../models/songModel');
const _UPDATE_DEFAULT_CONFIG = {
    new: true,
    runValidators: true
}

module.exports = {
    getSongs: getSongs,
    createSong: createSong,
    updateSong: updateSong,
    deleteSong: deleteSong,
    getSong: getSong
}

function getSongs(req, res) {
    SongModel.find()
        .then(responde => res.json(responde))
        .catch((err) => res.handdleError(err, res))
};

function getSong(req, res) {
    SongModel.findById(req.params._id)
        .then(response => res.json(response))
        .catch((err) => handdleError(err, res))
}

function createSong(req, res) {
    SongModel.create(req.body)
        .then(responde => {
            responde.createdAt = Date.now();
            res.json(responde)
        })
        .catch((err) => res.handdleError(err, res))
};

function updateSong(req, res) {
    SongModel.findByIdAndUpdate(req.params._id, req.body, _UPDATE_DEFAULT_CONFIG)
        .then(response => res.json(response))
        .catch((err) => res.handdleError(err, res))
};

function deleteSong(req, res) {
    SongModel.findById(req.params._id)
        .deleteOne()
        .then(response => res.json(response))
        .catch((err) => res.handdleError(err, res))
}

function handdleError(err, res){
    return res.status(400).json(err);
}