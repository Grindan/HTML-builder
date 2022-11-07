const path = require('path');
const fs = require('fs/promises');

const merge = async (sourceFolderPath, destinationFolderPath) => {
    await fs.rm(destinationFolderPath, { recursive: true, force: true });
    let result = '';

    const contents = await fs.readdir(sourceFolderPath, { withFileTypes: true });
    for (const item of contents) {
        const isFile = item.isFile();
        const isStyleFile = path.extname(item.name) === '.css';
        const shouldBeParsed = isFile && isStyleFile;

        if (shouldBeParsed) {
            const filePath = path.join(sourceFolderPath, item.name);
            const data = await fs.readFile(filePath, { encoding: 'utf-8' });
            result += `${data}\n`;
        }
    }

    await fs.writeFile(destinationFolderPath, result, { flag: 'wx' });

    console.log('✅ Successfully merged.');
};

((sourceFolder, destinationFolder) => {
    const sourcePath = path.join(__dirname, sourceFolder);
    const destinationPath = path.join(__dirname, destinationFolder);
    merge(sourcePath, destinationPath);
})('styles', 'project-dist/bundle.css');

module.exports = { merge };
