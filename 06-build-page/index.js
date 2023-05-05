const fs = require("fs");
const path = require("path");

const templatePath = "./06-build-page/template.html";
const componentsPath = "./06-build-page/components";
const distPath = "./06-build-page/project-dist";
const distIndexFilePath = "./06-build-page/project-dist/index.html";

fs.readFile(templatePath, "utf8", (err, templateData) => {
    if (err) {
        throw err;
    }

    fs.readdir(componentsPath, (err, files) => {
        if (err) {
            throw err;
        }

        files.forEach((file) => {
        const filePath = path.join(componentsPath, file);

            fs.readFile(filePath, "utf8", (err, componentData) => {
                if (err) {
                    throw err;
                }

                const tag = `{{${path.basename(file, path.extname(file))}}}`;
                templateData = templateData.replace(tag, componentData);

                if (files.indexOf(file) === files.length - 1) {
                    fs.mkdir(distPath, { recursive: true }, (err) => {
                        if (err) {
                            throw err;
                        }

                        fs.writeFile(distIndexFilePath, templateData, "utf8", (err) => {
                            if (err) {
                                throw err;
                            }
                        });
                    });
                }
            });
        });
    });
});


async function copyDirectory(dirFrom, dirTo) {
    await fs.promises.mkdir(dirTo, {recursive: true});

    const files = await fs.promises.readdir(dirFrom);

    for (let file of files) {
        const dirFromPath = path.join(dirFrom, file);
        const dirToPath = path.join(dirTo, file);

        const stat = await fs.promises.stat(dirFromPath);

        if (stat.isFile()) {
            const readStream = fs.createReadStream(dirFromPath);
            const writeStream = fs.createWriteStream(dirToPath);

            readStream.pipe(writeStream);
        } else if (stat.isDirectory()) {
            await copyDirectory(dirFromPath, dirToPath)
        }
    }
}

copyDirectory('./06-build-page/assets', './06-build-page/project-dist/assets');

const stylesFolder = './06-build-page/styles';
const bundleCSS = './06-build-page/project-dist/style.css';

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