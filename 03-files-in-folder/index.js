const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true} )

.then(filenames => {
  for (let filename of filenames){
    if (filename.isFile()) {
      const myFileName = filename.name.split(".")
      const myFileExt = path.extname(filename.name).split(".")
      fs.stat(path.resolve(__dirname, 'secret-folder',`${filename.name}` ), (error, stats)=> {
        if (error) {
          console.log(error);
        }
        else {
          console.log(`${myFileName[0]} - ${myFileExt[1]} - ${stats.size.toLocaleString()} Bytes`)}
        }
      )
    }
  }
})