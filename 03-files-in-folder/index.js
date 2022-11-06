const promises = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path'); //импорт модуля для работы с путями к файлам и каталогам
let dirPath = path.join('03-files-in-folder/secret-folder');

async function go() {
    try {
        const files = await promises.readdir(dirPath);
        for (const file of files) {
            let filePath = path.join(dirPath, file);//склеивается путь директории и название файла
            fs.stat(filePath, function (err, stats) {
                let pathObj = path.parse(filePath);
                console.log(`${pathObj.name} - ${pathObj.ext.slice(1)} - ${stats.size / 1000}kb`);
                //example - txt - 128.369kb
            })
        }
    } catch (err) {
        console.error(err);
    }
}
go();

