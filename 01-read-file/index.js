const fs = require('node:fs');//импорт модуля работы с файловой системой
const path = require('node:path'); //импорт модуля для работы с путями к файлам и каталогам
let normalPath = path.join('01-read-file/text.txt');
let readStream = fs.createReadStream(normalPath, 'utf-8');
readStream.on('data', function (chunk) {
  console.log(chunk);
});

readStream.on('error', function () {
  console.log(0);
});

