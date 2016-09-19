const fs = require('fs');
const async = require('async');

const version = require('./package.json').version;
const srcDir = './src/';
const distDir = './dist/';

const modifiers = {
  'index.appcache': (data) => {
    return data.toString()
      .replace(/\{date\}/g, Date.now())
      .replace(/\{version\}/g, version);
  },
  'index.js': () => false
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

      if (modifiers[file]) {
        data = modifiers[file](data);
      }

      if (data === false) {
        callback();
        return;
      }

      fs.writeFile(distDir + file, data, callback);
    });
  }, (eachError) => {
    if (eachError) {
      console.log(eachError);
    }
  });
});
