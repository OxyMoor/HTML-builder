const fs = require('fs');
const path = require('path');

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

copyDirectory('./04-copy-directory/files', './04-copy-directory/files-copy');