const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream('./01-read-file/text.txt', 'utf-8');
stream.on('data', (chunk) => {
    console.log(chunk);
});