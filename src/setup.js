'use strict';
const fs = require('fs');
fs.createReadStream('./src/sample_CONSTANTS.json')
    .pipe(fs.createWriteStream('./src/CONSTANTS.json'));