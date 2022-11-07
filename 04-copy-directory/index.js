const path = require('path');
const fs = require('fs/promises');

const copy = async (sourceFolderPath, destinationFolderPath) => {
    await fs.rm(destinationFolderPath, { recursive: true, force: true });
    await fs.mkdir(destinationFolderPath, { recursive: true });

    const files = await fs.readdir(sourceFolderPath, { withFileTypes: true });
    for (const file of files) {
        if (file.isFile()) {
            await fs.copyFile(`${sourceFolderPath}/${file.name}`, `${destinationFolderPath}/${file.name}`);
        } else {
            const newFolder = path.join(destinationFolderPath, file.name);
            await mkdir(newFolder, { recursive: true });
            await copy(`${sourceFolder}/${file.name}`, `${destinationFolder}/${file.name}`);
        }
    }

    console.log('✅ Successfully copied.');
};

((sourceFolder, destinationFolder) => {
    const sourcePath = path.join(__dirname, sourceFolder);
    const destinationPath = path.join(__dirname, destinationFolder);
    copy(sourcePath, destinationPath);
})('files', 'files_copy');

module.exports = { copy };
