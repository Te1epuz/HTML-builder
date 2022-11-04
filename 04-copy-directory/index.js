const fs = require('fs');
const path = require('path');

let directoryPath = path.join(__dirname, 'files');
let newDirectoryPath = path.join(__dirname, 'files-copy');

function makeFolder() {
  fs.mkdir(newDirectoryPath, { recursive: true }, (err) => {
    if (err) {console.log(err.message)}
  });
};

function deleteFiles() {
  fs.promises.readdir(newDirectoryPath, {withFileTypes: true})
    .then ((files) => {
      files.forEach(file => {
        if (file.isDirectory()) {
          console.log('Recursive deleting of folder was NOT in the task!')
        }
        if (file.isFile()) {
          fs.unlink(path.join(newDirectoryPath, file.name), (err) => {
            if (err) {console.log(err.message)}
          });
        }
      })
    })
}

function copyFiles() {
  fs.promises.readdir(directoryPath, {withFileTypes: true})
    .then((files) => {
      files.forEach(file => {
        let sourceFile = path.join(directoryPath, file.name);
        let destFile = path.join(newDirectoryPath, file.name);
        fs.promises.copyFile(sourceFile, destFile);
      })
    })
};


makeFolder();
deleteFiles();
copyFiles();