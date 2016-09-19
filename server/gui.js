const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [
      '\'self\'',
      'https://cdnjs.cloudflare.com'
    ],
    connectSrc: [
      'https://*.mijnherman.nl:8000',
      'wss://*.mijnherman.nl:8000'
    ],
    imgSrc: [
      '\'self\''
    ]
  }
}));

app.use(helmet());
app.use(express.static('dist'));

https.createServer({
  ca: fs.readFileSync(__dirname + '/../conf/ca.crt'),
  pfx: fs.readFileSync(__dirname + '/../conf/server.pfx')
}, app).listen(9000);
