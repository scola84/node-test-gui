const fs = require('fs');

fs.readFile('./src/index.appcache', (readError, data) => {
  if (readError) {
    console.log(readError);
    return;
  }

  data = data.toString().replace('{date}', Date.now());

  fs.writeFile('./dist/index.appcache', data, (writeError) => {
    if (writeError) {
      console.log(writeError);
    }
  });
});

fs.readFile('./src/index.css', (readError, data) => {
  if (readError) {
    console.log(readError);
    return;
  }

  fs.writeFile('./dist/index.css', data, (writeError) => {
    if (writeError) {
      console.log(writeError);
    }
  });
});

fs.readFile('./src/index.html', (readError, data) => {
  if (readError) {
    console.log(readError);
    return;
  }

  fs.writeFile('./dist/index.html', data, (writeError) => {
    if (writeError) {
      console.log(writeError);
    }
  });
});
