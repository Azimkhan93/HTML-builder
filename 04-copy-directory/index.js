const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');



fsPromises.mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true} )

fs.readdir(path.resolve(__dirname, 'files'), function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  files.forEach(function (file) {
      fsPromises.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file))
      console.log(file); 
  });
});