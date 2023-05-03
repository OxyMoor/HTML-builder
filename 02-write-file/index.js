const fs = require('fs');
const path = require('path');
const readline = require('readline');

const writeStream = fs.createWriteStream('./02-write-file/text.txt', 'utf-8');
console.log('Please, enter text');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
});
rl.prompt();
rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
        writeStream.end();
    } else {
        writeStream.write(input + '\n');
    }
});

process.on('exit', () => {
    console.log('File writing completed');
    rl.close();
    writeStream.end();
})