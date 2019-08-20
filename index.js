const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const fs = require('fs');
const https = require('https');

let config = require('./config')[process.env.NODE_ENV];

mongoose.connect(config.db, {useNewUrlParser: true, useCreateIndex: true}).then(() => {
    console.log("Conecting");
    app.listen(config.port, () => {
        console.log(`API: http://localhost:${config.port}`);
        
    })
    
},
err => {
    console.log(`ERROR conecting with db: ${err}`);
    
}
).catch((err) => {
    console.log(`ERROR other type: ${err}`);
    
});


