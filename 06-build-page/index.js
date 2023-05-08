const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');



// ---------------------------Copy and Move assets------------------------------------------------
// create folder
fsPromises.mkdir(path.resolve(__dirname, 'project-dist'), {recursive: true}).then(
  fsPromises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), {recursive: true} ),
  fsPromises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'fonts' ), {recursive: true} ),
  fsPromises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'img' ), {recursive: true} ),
  fsPromises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', 'svg' ), {recursive: true} )

)

// fonts
fs.readdir(path.resolve(__dirname, 'assets', 'fonts'), function (err, files) {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
      fsPromises.copyFile(path.resolve(__dirname, 'assets', 'fonts', file), path.resolve(__dirname, 'project-dist', 'assets', 'fonts', file))
  });
});

//img
fs.readdir(path.resolve(__dirname, 'assets', 'img'), function (err, files) {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
      fsPromises.copyFile(path.resolve(__dirname, 'assets', 'img', file), path.resolve(__dirname, 'project-dist', 'assets', 'img', file))
  });
});

//svg
fs.readdir(path.resolve(__dirname, 'assets', 'svg'), function (err, files) {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
      fsPromises.copyFile(path.resolve(__dirname, 'assets', 'svg', file), path.resolve(__dirname, 'project-dist', 'assets', 'svg', file))
  });
});
// ---------------------------Copy and Move assets------------------------------------------------

// ---------------------------------Copy css---------------------------------------
fsPromises.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true} )

.then(filenames => {
  
  let contentFile = [];
  for (let filename of filenames){
  
    if (filename.isFile() && path.extname(filename.name)=== '.css') {
      fs.readFile(path.resolve(__dirname, 'styles',filename.name), 'utf-8', function(error, fileContent){
        
        if(error) throw error;
        contentFile.push(fileContent);
        fs.writeFile(path.resolve(__dirname, 'project-dist','style.css'), contentFile.join(" "), function(error){
          if(error) throw error;
        })
      })
    }
  }
})
// -----------------------Copy css----------------------------------------------------


async function readAll(arrTemplate, template) {
  for(let i = 0; i < arrTemplate.length; i++) {
    const itemData = await fs.promises.readFile(path.resolve(__dirname,'components', `${arrTemplate[i]}.html`), 'utf-8')
    
    template = template.replace(`{{${arrTemplate[i]}}}`, itemData);
  }

  return template
}

fs.readFile(path.resolve(__dirname,'template.html'), 'utf-8', (error, data)=> {
  if(error) throw error;

  let template = data;  

  const arrTempTemplate = [...template.matchAll(/\{\{[A-Za-z]+\}\}/g)];
  const arrTemplateToStr = arrTempTemplate.join(" ");
  const strTemplate = arrTemplateToStr.replace(/\{\{([A-Za-z]+)\}\}+/g, '$1');
  const arrTemplate = strTemplate.split(" ");
  readAll(arrTemplate, template)
  .then((returnedTemplate) => {
    fs.writeFile(path.resolve(__dirname,'project-dist', 'index.html'), returnedTemplate, 'utf-8', function (error) {
          if(error) throw error;
        }); 
  })
  

});