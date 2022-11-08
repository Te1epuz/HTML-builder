const fs = require('fs');
const path = require('path');

let folderPath = path.join(__dirname, 'files');
let newFolderPath = path.join(__dirname, 'files-copy');

async function makeFolder(newFolderPath){
  await fs.promises.rm(newFolderPath, { recursive: true, force: true });
  await fs.promises.mkdir(newFolderPath, { recursive: true });
}

async function copyFiles(folderPath, newFolderPath){
  let files = await fs.promises.readdir(folderPath, {withFileTypes: true})
  for (let file of files) {
    if (file.isDirectory()) {
      let OldFolder = path.join(folderPath, file.name);
      let newFolder = path.join(newFolderPath, file.name);
      await fs.promises.mkdir(newFolder, { recursive: true });
      await copyFiles(OldFolder, newFolder);
    }
    else {
      let sourceFile = path.join(folderPath, file.name);
      let destFile = path.join(newFolderPath, file.name);
      await fs.promises.copyFile(sourceFile, destFile);
    }
  }
}

async function copyFolder() {
  await makeFolder(newFolderPath);
  await copyFiles(folderPath, newFolderPath);
}
copyFolder()