var request = require('request');

function getStations(req, res) {
  request.get('http://www.lemon-radio.com/web-service-v2/?show=radios_in_country&parent_id=177', function (error, response, body) {
      if (error) throw error;
      var dataJson = JSON.parse(body)
      res.send(dataJson.data)
  });
}

function getStream(req, res) {
  const id = parseInt(req.params.id, 10);
  request.get(`http://www.lemon-radio.com/web-service-v2/?show=radio_streams_all&parent_id=${id}`, function (error, response, body) {
      if (error) throw error;
      var dataJson = JSON.parse(body)
      res.send(dataJson.streams)
  });
}

//   function postHero(req, res) {
//     const originalHero = { id: req.body.id, name: req.body.name, saying: req.body.saying };
//     const hero = new Hero(originalHero);
//     hero.save(error => {
//       if (checkServerError(res, error)) return;
//       res.status(201).json(hero);
//       console.log('Hero created successfully!');
//     });
//   }
  
function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, hero) {
  if (!hero) {
    res.status(404).send('Hero not found.');
    return;
  }
  return hero;
}

module.exports = {
  getStations,
  getStream,
  // postStation
};