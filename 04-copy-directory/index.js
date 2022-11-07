const promises = require('node:fs/promises');
const path = require('node:path'); //импорт модуля для работы с путями к файлам и каталогам
let origFilesPath = path.join('04-copy-directory/files');
let copyFilesPath = path.join('04-copy-directory/files-copy');

//сначала должна удалиться директория
//потом создаться новая


//
//             fs.rm('04-copy-directory/files-copy', {recursive: true, force: true}, err => {
//                 if (err) {
//                     throw err;
//                 }
//             });
//             console.log('Директория была и нет теперь');
async function deleteDir() {
    try {
        await promises.rm(copyFilesPath, {recursive: true, force: true});
    } catch (err) {
        console.log("папки не было, поэтому не удалили");
    }
}

async function makeDir() {
    try {
        await promises.mkdir(copyFilesPath, {recursive: true});
    } catch (err) {
        console.log('can not create a folder');
    }


}



async function copyDir() {
    try {
        const files = await promises.readdir(origFilesPath);//массив хранящихся файлов по укказанному пути
        for (const file of files) {
            let filePath = path.join(origFilesPath, file);//склеивается путь директории и название файла
            let copyFilePath = path.join(copyFilesPath, file);
            let stat = await promises.stat(filePath);
            if (stat.isFile()) {
                try {
                    await promises.copyFile(filePath, copyFilePath);
                } catch {
                    console.log('The file could not be copied');
                }

            }
        }
    } catch (err) {
        console.error(err);
    }
}

async function go() {
    await deleteDir();
    await makeDir();
    await copyDir();
}
go();