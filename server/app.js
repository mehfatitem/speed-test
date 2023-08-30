const express = require('express');
const app = express();
const SpeedTestController = require('./controllers/SpeedTestController');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('client'));


// Serve static files from the client folder
app.use(express.static(path.join(__dirname, '..', 'client')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/speedtest', (req, res) => {
  SpeedTestController.getSpeedTestResults(req, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
