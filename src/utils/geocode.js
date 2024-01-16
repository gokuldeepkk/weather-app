import request from 'postman-request';

const baseUrl = 'https://api.mapbox.com/geocoding/v5/';
const accessToken = 'pk.eyJ1IjoiZ29rdWxkZWVwNDEiLCJhIjoiY2xyZjNrOWNmMDEzMjJpcGY0bG1lMDMxcCJ9.6mHblYMf5CnKvMrSxDRQQA';

const geocode = (address, callback) => {
    const url = `${baseUrl}mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`;
    request(url, {json: true}, (err, response) => {
        if(err) {
            callback('Unable to connect to Location Services');
        } else {
            const body = response.body;
            if(!body.features.length) {
                callback('Unable to fetch location. Please Try Again.');
                return;
            }
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

export default geocode;