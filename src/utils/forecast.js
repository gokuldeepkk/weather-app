import request from 'postman-request';

const baseUrl = 'http://api.weatherstack.com/';
const accessKey = '1323d9088d19134125b11a50f1dffa91';

const forecast = (lat, long, callback) => {
    const url = `${baseUrl}current?access_key=${accessKey}&query=${lat},${long}`;
    request(url, { json: true }, (err, response) => {
        if(err) {
            callback('Unable to connect to Weather Service!')
        } else {
            const body = response.body;
            if(body.error) {
                callback('Unable to reteieve Weather data')
            } else {
                callback(undefined, {
                    location: body.location.name,
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    humidity: body.current.humidity,
                    icon: body.current.weather_icons[0],
                    description: body.current.weather_descriptions[0]
                });
            }
        }
    });
}

export default forecast;