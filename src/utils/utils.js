const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWxleGxlZS1kZXYiLCJhIjoiY2pseWE5YXZyMWgxNzNrbGloNGZuOTF5ZSJ9.S-jZLqsN--rSuc3FrAVNgA&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/117ccbdf619033687ac9fe73e7050fec/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, response) => {
    debugger;
    if (error) {
      callback("Unable to connect to forecast service!", undefined);
    } else if (response.body.error) {
      callback(response.body.error, undefined);
    } else {
      const { temperature, precipProbability } = response.body.currently;
      const { summary } = response.body.daily.data[0];
      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = {
  forecast,
  geocode
};
