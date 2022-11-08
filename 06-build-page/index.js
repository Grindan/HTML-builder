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
    const destinationPath = path.join(__dirname, 'project-dist/style.css');

    await merge(sourcePath, destinationPath);
};

const buildTemplate = async () => {
    const htmlPath = path.join(__dirname, 'template.html');
    let html = await fs.readFile(htmlPath, { encoding: 'utf-8' });

    const componentFolderPath = path.join(__dirname, 'components');
    const componentFiles = await fs.readdir(componentFolderPath);
    const components = await componentFiles.reduce(async (acc, fileName) => {
        const extname = path.extname(fileName);
        const basename = path.basename(fileName, extname);

        const componentFilePath = path.join(__dirname, 'components', fileName);
        const componentHtml = await fs.readFile(componentFilePath, { encoding: 'utf-8' });
        acc[`{{${basename}}}`] = componentHtml;

        const re = new RegExp(`{{${basename}}}`, 'g');
        html = html.replace(re, componentHtml);

        return acc;
    }, {});

    const destinationHtmlPath = path.join(__dirname, 'project-dist/template.html');
    await fs.writeFile(destinationHtmlPath, html, { flag: 'wx' });
};

const build = async () => {
    const folderPath = path.join(__dirname, 'project-dist');

    await fs.rm(folderPath, { recursive: true, force: true });
    await fs.mkdir(folderPath);

    await copyAssets();
    await mergeStyles();
    await buildTemplate();
};

build();
