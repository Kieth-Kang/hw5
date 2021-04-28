//   - days = number of days of forecast data to return, between 1-10
// - Homework: Complete the application by accepting a number of days; show the current weather conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
      let daysInput = document.querySelector(`#days`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value
      let days = daysInput.value
  
      // - Check to see if the user entered anything; if so:
      if(location.length > 0 && days.length > 0 && daysInput.value > 0){
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=3cbfd057b7b24989983155532212704&q=${location}&days=${days}`
        
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
  
        // Store a reference to the "current" element
        let current = document.querySelector(`.current`)

        // Fill the current element with the location and current weather conditions
        current.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">
              <img src="https:${currentWeather.condition.icon}" class="inline-block">
             <span class="temperature">${currentWeather.temp_f}</span>° 
              and
             <span class="conditions">${currentWeather.condition.text}</span>
            </div>
          </div>
        `

        // Create a variable for the forecastday data
        let forecastDay = json.forecast.forecastday

        // Store a reference to the "forecast" element
        let forecast = document.querySelector(`.forecast`)

        // Fill the forecast title
        forecast.innerHTML = `
        <div class="text-center space-y-8">
            <div class="font-bold text-3xl">${days} Day Forecast</div>
        <div>
        `

        // Loop through the forecast data with the forecast weather conditions
        for (let i=0; i<forecastDay.length; i++) {
            forecast.insertAdjacentHTML(`beforeend`,
            `<div class="text-center space-y-8">
                <div class="text-center">
                    <img src="https:${forecastDay[i].day.condition.icon}" class="mx-auto">
                    <h1 class="text-2xl text-bold text-gray-500">${forecastDay[i].date}</h1>
                    <h2 class="text-xl">High ${forecastDay[i].day.maxtemp_f}° – Low ${forecastDay[i].day.mintemp_f}°</h2>
                    <p class="text-gray-500">${forecastDay[i].day.condition.text}</h1>
                <div>
            </div>
            `)
        }
      // Add message for users who input improper query information
      }else {
        alert("Please make sure to enter Location and Days. Days number should be no less than 1.")}
    }) 
  })