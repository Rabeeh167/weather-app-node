const request = require('request');

// getWeatherstackInfo(location, (error, data) => {
//     if (error) {
//         console.log(error)
//         return error;
//     }
//     else {
//         console.log(data)
//         return data;
//     }
// })

const getWeatherstackInfo = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0a764fab8e7d70cea0685412548ba119&query=${location}&units=m`;
    request({ 'url': url, json: true },
        (err, response) => {
            if (err) {
                callback("unable to connect to weather api", undefined)
            } else if (response.body.error) {
                callback('unable to find location', undefined)
            }
            else {
                callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out`)
            }
        })
}



module.exports = {
    getWeatherstackInfo 
}