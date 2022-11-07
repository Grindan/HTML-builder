const path = require('path');
const fs = require('fs/promises');

const showFiles = async () => {
    const filePath = path.join(__dirname, 'secret-folder');

    const dirs = await fs.readdir(filePath, { withFileTypes: true });
    const filteredFiles = dirs.filter((dirent) => dirent.isFile());
    filteredFiles.forEach(async (file) => {
        const extname = path.extname(file.name);
        const formattedExtname = extname.slice(1);

        const basename = path.basename(file.name, extname);
        const filePath = path.join(__dirname, 'secret-folder', file.name);

        const stats = await fs.stat(filePath);
        const formattedSize = `${stats.size}b`;

        process.stdout.write(`${basename} - ${formattedExtname} - ${formattedSize}\n`);
    });
};

showFiles();
