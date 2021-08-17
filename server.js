require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// URL shortener endpoint
var ctrl = require('./controller');
let shortener = new ctrl.DefaultURLShortener();
app.get('/api/shorturl/:shortURL', shortener.redirect);
app.post('/api/shorturl', shortener.add);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
