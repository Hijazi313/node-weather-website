const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/0ad958ffad822ebbfa518a051fdb02e4/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Service", undefined);
    } else if (body.error) {
      callback("Unable to Find Location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} ${body.currently.temperature} degrees out There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
