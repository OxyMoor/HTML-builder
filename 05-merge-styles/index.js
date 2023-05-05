const fs = require('fs');
const path = require('path');

const stylesFolder = './05-merge-styles/styles';
const bundleCSS = './05-merge-styles/project-dist/bandle.css';

fs.promises.mkdir(path.dirname(bundleCSS), {recursive: true})
    .then(() => {
        fs.promises.writeFile(bundleCSS, '');
    })
    .then(() => {
        return fs.promises.readdir(stylesFolder)
            .then(files => {
                return files.reduce((prom, file) => {
                    if (path.extname(file) === '.css') {
                        return prom.then(() => {
                            const filePath = path.join(stylesFolder, file);
    
                            return fs.promises.readFile(filePath, 'utf-8')
                                .then(stylePart => {
                                    return fs.promises.appendFile(bundleCSS, stylePart);
                                });
                        });
                    }
                }, Promise.resolve());
            });
    });