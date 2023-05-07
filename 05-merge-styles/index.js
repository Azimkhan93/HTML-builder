const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

fsPromises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true} )

.then(filenames => {
  
  let contentFile = [];
  for (let filename of filenames){
  
    if (filename.isFile() && path.extname(filename.name)=== '.css') {
      console.log(filename.name);
      fs.readFile(path.resolve(__dirname, 'styles',filename.name), 'utf-8', function(error, fileContent){
        
        if(error) throw error;
        contentFile.push(fileContent);
        fs.writeFile(path.resolve(__dirname, 'project-dist','bundle.css'), contentFile.join(" "), function(error){
        
          if(error) throw error;
          console.log('Data is recorded successfully');
        })
      })
    }
  }
})
    
    
   