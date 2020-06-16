
console.log("from javascript file")




const weatherForm = document.querySelector('form')
const weatherLocation = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    getWeatherData(weatherLocation.value);
})

const getWeatherData = (location) => {
fetch(`/weather?location=${location}`).then((response) => {
    response.json().then((data) =>{
        if(data.name){
            // console.log("error",error)
            messageOne.textContent = data.name;
            messageTwo.textContent = '';
            return data.name
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.result;
        console.log('data',data)
        return data
    })
})
}