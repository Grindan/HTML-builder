const path = require('path');
const fs = require('fs');

const write = async () => {
    const filePath = path.join(__dirname, 'text.txt');
    const writableStream = fs.createWriteStream(filePath, { encoding: 'utf-8' });

    process.stdout.write('\nWrite your text: \n');
    process.stdin.on('data', (chunk) => {
        const parsedChunk = chunk.toString('utf8');
        if (parsedChunk.includes('exit')) {
            process.stdout.write('\n✅ Your data was saved. \n');
            process.exit();
        } else {
            writableStream.write(chunk);
        }
    });
    process.on('SIGINT', () => {
        process.stdout.write('\n✅ Your data was saved. \n');
        process.exit();
    });
};

write();
