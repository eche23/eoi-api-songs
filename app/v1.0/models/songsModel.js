const mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
});

module.exports = mongoose.model('song', SongSchema);