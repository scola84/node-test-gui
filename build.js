const fs = require('fs');
const async = require('async');

const version = require('./package.json').version;
const srcDir = './src/';
const distDir = './dist/';

const modifiers = {
  'index.appcache': (file, data) => {
    return {
      data: data.toString()
        .replace(/\{date\}/g, Date.now())
        .replace(/\{version\}/g, version),
      file
    };
  },
  'index.css': (file, data) => {
    return {
      file: 'index.min.css',
      data
    };
  },
  'index.js': () => {
    return {
      file: false
    };
  }
};

fs.readdir(srcDir, (dirError, files) => {
  if (dirError) {
    console.log(dirError);
    return;
  }

  async.each(files, (file, callback) => {
    fs.readFile(srcDir + file, (readError, data) => {
      if (readError) {
        callback(readError);
        return;
      }

      let result = {
        file,
        data
      };

      if (modifiers[file]) {
        result = modifiers[file](file, data);
      }

      if (result.file === false) {
        callback();
        return;
      }

      fs.writeFile(distDir + result.file, result.data, callback);
    });
  }, (eachError) => {
    if (eachError) {
      console.log(eachError);
    }
  });
});
