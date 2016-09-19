const path = require('path');
const livereload = require('livereload');
const server = livereload.createServer();
server.watch(path.resolve(__dirname + '/../dist'));
