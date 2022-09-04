const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/start', (req, res) => {
  res.json('start app');
});

app.listen(PORT, () => {
  console.log('Server has been started on', PORT);
});
