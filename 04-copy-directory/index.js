const path = require('path');
const fs = require('fs/promises');

const copy = async () => {
    const sourcePath = path.join(__dirname, 'files');
    const destinationPath = path.join(__dirname, 'files_copy');

    await fs.rm(destinationPath, { recursive: true, force: true });
    await fs.mkdir(destinationPath);

    const files = await fs.readdir(sourcePath);
    for (const file of files) {
        await fs.copyFile(`${sourcePath}/${file}`, `${destinationPath}/${file}`);
    }

    console.log('✅ Successfully copied.');
};

copy();
