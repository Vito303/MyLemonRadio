const express = require('express');
const router = express.Router();

const stationService = require('./service');

router.get('/stations', (req, res) => {
  stationService.getStations(req, res);
});

router.get('/streams/:id', (req, res) => {
  stationService.getStream(req, res);
});

// router.post('/station', (req, res) => {
//   heroService.postStation(req, res);
// });

module.exports = router;