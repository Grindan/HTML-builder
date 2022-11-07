const path = require('path');
const fs = require('fs');

const read = async () => {
    try {
        const filePath = path.join(__dirname, 'text.txt');
        const readableStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

        readableStream.on('data', (chunk) => process.stdout.write(chunk));
        readableStream.on('end', () => process.stdout.write('\n'));
    } catch (e) {
        throw new Error(e);
    }
};

read();
