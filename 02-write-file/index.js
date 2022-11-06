//const readline = require('node:readline');
const path = require('node:path'); //импорт модуля для работы с путями к файлам и каталогам
const fs = require('node:fs');
const process = require('node:process');
const stream = require('node:stream');

let textPath = path.join('02-write-file/text.txt');
let writeStream = fs.createWriteStream(textPath);


let readStream = stream.Readable.from(process.stdin);
readStream.setEncoding('utf8');

function finishStream() {
    console.log('Конец связи');
    process.exit();
}

process.on('SIGINT', () => {
    finishStream();
});

console.log('Введите что-нибудь!');
readStream.on('data', function (chunk) {
    if (!chunk.includes('exit')) {
        writeStream.write(chunk);
        //write
    }
    else {
        finishStream();
    }});
readStream.on('error', (err) => console.log(err));


