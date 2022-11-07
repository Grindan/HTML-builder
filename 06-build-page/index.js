const path = require('path');
const fs = require('fs/promises');

const { copy } = require('../04-copy-directory');
const { merge } = require('../05-merge-styles');

const copyAssets = async () => {
    const sourcePath = path.join(__dirname, 'assets');
    const destinationPath = path.join(__dirname, 'project-dist/assets');

    await copy(sourcePath, destinationPath);
};

const mergeStyles = async () => {
    const sourcePath = path.join(__dirname, 'styles');
    const destinationPath = path.join(__dirname, 'project-dist/bundle.css');

    await merge(sourcePath, destinationPath);
};

const build = async () => {
    const folderPath = path.join(__dirname, 'project-dist');

    await fs.rm(folderPath, { recursive: true, force: true });
    await fs.mkdir(folderPath);

    await copyAssets();
    await mergeStyles();
};

build();
