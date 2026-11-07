// import fs from 'fs';
// import path from 'path';

// const sourceDir = './files';
// const destinationDir = './copied-files';

// if (!fs.existsSync(sourceDir)) {
//   console.warn(`Source dir ${sourceDir} dosen't exist!`);
//   console.log('Exiting...');
//   process.exit(0);
// }

// if (fs.existsSync(destinationDir)) {
//   fs.rmSync(destinationDir, { recursive: true, force: true });
// }

// fs.mkdirSync(destinationDir, { recursive: true });

// fs.readdir(sourceDir, (err, fileNames) => {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   fileNames.forEach((fileName, index) => {
//     const sourceFilePath = path.join(sourceDir, fileName);
//     const destinationFilePath = path.join(
//       destinationDir,
//       `${index + 1}. ${fileName}`,
//     );

//     const readFileStream = fs.createReadStream(sourceFilePath);
//     const writeFileStream = fs.createWriteStream(destinationFilePath);

//     readFileStream.pipe(writeFileStream);

//     writeFileStream.on('finish', () => {
//       console.log(`File ${fileName} was copied`);
//     });
//   });
// });

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';

const sourceDir = './files';
const destinationDir = './copied-files';

async function copyFiles() {
  try {
    // 1. Проверяем исходную папку
    if (!fs.existsSync(sourceDir)) {
      console.warn(`Source dir ${sourceDir} doesn't exist!`);
      console.log('Exiting...');
      process.exit(0);
    }

    // 2. Гарантированно удаляем старую папку (в асинхронном режиме это работает стабильно)
    if (fs.existsSync(destinationDir)) {
      await fsPromises.rm(destinationDir, { recursive: true, force: true });
    }

    // 3. Создаем чистую папку
    await fsPromises.mkdir(destinationDir, { recursive: true });

    // 4. Читаем файлы
    const fileNames = await fsPromises.readdir(sourceDir);
    console.log('Files to copy:', fileNames);

    // 5. Копируем файлы по очереди, дожидаясь закрытия каждого стрима
    for (const [index, fileName] of fileNames.entries()) {
      const sourceFilePath = path.join(sourceDir, fileName);
      const destinationFilePath = path.join(
        destinationDir,
        `${index + 1}. ${fileName}`,
      );

      const readFileStream = fs.createReadStream(sourceFilePath);
      const writeFileStream = fs.createWriteStream(destinationFilePath);

      // pipeline сам следит за закрытием потоков и отловом ошибок
      await pipeline(readFileStream, writeFileStream);
      console.log(`File ${fileName} was copied`);
    }

    console.log('All files copied successfully!');
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  }
}

// Запускаем нашу функцию
copyFiles();
