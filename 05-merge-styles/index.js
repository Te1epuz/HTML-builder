const fs = require('fs');
const path = require('path');

let stylesDirectoryPath = path.join(__dirname, 'styles');
let projectFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

const output = fs.createWriteStream(projectFilePath);
output.write('');

fs.promises.readdir(stylesDirectoryPath, {withFileTypes: true})
  .then ((files) => {
    files.forEach(file => {
      if (file.isFile()) {
        if (path.extname(path.join(stylesDirectoryPath, file.name)) === '.css') {
          fs.readFile(path.join(stylesDirectoryPath, file.name), 'utf-8', (err, data) => {
            if (err) { console.log(err.message); }
            output.write(data);
          })
        }
      }
    })
  })