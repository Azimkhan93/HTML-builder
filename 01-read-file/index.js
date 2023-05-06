const fs = require('fs');
const path = require('path');
const { stdout, stderr } = process;


const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');
let data = ''
readStream.on('data', chunk => data += chunk);
process.on ('exit', code => {
  if (code === 0) {
        stdout.write(data);
    } else {
        stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
    }
})