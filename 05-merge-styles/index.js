const path = require('path');
const fs = require('fs/promises');

const merge = async () => {
    const sourcePath = path.join(__dirname, 'styles');
    const destinationPath = path.join(__dirname, 'project-dist', 'bundle.css');

    await fs.rm(destinationPath, { recursive: true, force: true });
    let result = '';

    const contents = await fs.readdir(sourcePath, { withFileTypes: true });
    for (const item of contents) {
        const isFile = item.isFile();
        const isStyleFile = path.extname(item.name) === '.css';
        const shouldBeParsed = isFile && isStyleFile;

        if (shouldBeParsed) {
            const filePath = path.join(sourcePath, item.name);
            const data = await fs.readFile(filePath, { encoding: 'utf-8' });
            result += `${data}\n`;
        }
    }
    await fs.writeFile(destinationPath, result);

    console.log('✅ Successfully merged.');
};

merge();
