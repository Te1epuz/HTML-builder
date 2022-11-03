const fs = require('fs');
const path = require('path');
const { stdout } = process;

let file = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(file, 'utf-8');
let data = '';

readStream.on('error', error => console.log('console: ' + error.message));

readStream.on('data', chunk => data += chunk);

readStream.on('end', () => {
  console.log('console: ' + data);
  stdout.write('stdout: ' + data);
});
