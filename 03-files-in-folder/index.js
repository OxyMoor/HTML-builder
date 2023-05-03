const fs = require('fs');
const path = require('path');

fs.readdir('./03-files-in-folder/secret-folder', (err, files) => {
    files.forEach(file => {
        fs.stat(`./03-files-in-folder/secret-folder/${file}`, (err, stat) => {
            if (stat.isFile()) {
                console.log(path.basename(`./03-files-in-folder/secret-folder/${file}`).split('.')[0] + ' - ' + path.extname(`./03-files-in-folder/secret-folder/${file}`).split('.')[1] + ' - ' + `${stat.size}byte`);
            }
        });
    })
});