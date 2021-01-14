//call out cityHistory list with class History 
let cityHistory = $(".history")
//call out todayCast div with id #today
let todaysForecast = $("#today")
//call out fiveCast with id #forecast
let fiveDayForecast = $("#forcast")
//call out searchField input with id#search-value
let searchField = $("#search-value")
//call out searchButton with id#search-button
let searchButton = $("#search-button")
let myKey = config.MY_API_KEY 
let monster;

 //Search Button Onclick 
searchButton.on("click", function() {
    searchForCity();
    //Value of searchField
    searchField.val("");
} )
    
function searchForCity() {
    //Valid city serch
   if(!parseInt(searchField.val().trim())) {
        console.log("hello");
        //Save to local storage
        localStorage.setItem("search", searchField.val().trim());
        newButton();
        generateWeather(searchField.val().trim())
   }else {
       alert("Enter a valid city name, Use only letters")
   }
   
};    
   
    
//Makes a new button
function newButton() {
    let button = $("<button>")
    //Gives text and value equal to searchField in local storage
    button.val(localStorage.getItem("search"));
    button.text(localStorage.getItem("search"))
    //Gives button class of searchedCity
    button.attr("class", "searchedCity");
    //When button gets clicked
    button.on("click", function() {
    generateWeather(button.val())
    }); 
    //Appends button to cityHistory
    cityHistory.append(button);
}    

//Calls the Weather API
    
function generateWeather(cube) {
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cube + "&appid=" + myKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        contructToday(response);
        monster = response;
    });
}

    
//Appends todays Informationg    
function contructToday(cube) {
    todaysForecast.empty();
    let cityName= $("<p><strong>City Name:</strong> "+ cube.name + "</p>")
    todaysForecast.append(cityName)
    const event = new Date(cube.dt*1000);
    console.log(event.toDateString());
    let todayDate = $("<p><strong>Today's Date:</strong> "+ event.toDateString() + "</p>")
    todaysForecast.append(todayDate);
    let currentConditions = $("<p><strong>Current Conditions:</stong> "+ cube.weather[0].description + "</p>")
    let weatherIcon = $("<img>")
    weatherIcon.attr("src",
                "http://openweathermap.org/img/wn/" + cube.weather[0].icon + "@2x.png"
    )
    currentConditions.append(weatherIcon)
    todaysForecast.append(currentConditions)
    let currentTemp = cube.main.temp;
    currentTemp = (cube.main.temp - 273.15) * 1.80 + 32;
    let tempDisplay = $("<p><strong>Current Temperature:</strong> "+currentTemp.toFixed(2) + "°F</p>")
    todaysForecast.append(tempDisplay);
    let currentHumidity = $("<p><strong>Humidity:</strong> "+ cube.main.humidity + "%</p>")
    todaysForecast.append(currentHumidity);
    let windSpeed = $("<p><strong>Wind Speed:</strong> "+ (cube.wind.speed * 2.237).toFixed(2) + "mph</p>")
    todaysForecast.append(windSpeed);
    
    
    //UVI AJAX call
    var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ cube.coord.lat + "&lon=" + cube.coord.lon + "&exclude=alerts&appid=" + myKey;

    $.ajax({
        url: oneCallURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        let currentUV = $("<span>" + response.current.uvi +"</span>")
            if (parseInt(response.current.uvi) < 3) {
                currentUV.attr("class", "bg-success") 
            }else if(response.current.uvi < 8) {
                currentUV.attr("class", "bg-warning")
            }else{
                currentUV.attr("class", "bg-danger")
            }
        
        ultraviolet = $("<p><strong>UV Index: </strong></p>")
        ultraviolet.append(currentUV)
        todaysForecast.append(ultraviolet)


    });
    
};  

function futureForcast(cube) {
    fiveDayForecast.empty();
    let fiveDays = $("<div>")
    fiveDays.attr("class", "row bg-light border rounded")
    fiveDayForecast.append("<h1>Five Day Forecast:</h1>")
    
    for (let i=1; i<6; i++) {
        //Creates 5 blocks
        let forecastBlock = $("<div>")
        forecastBlock.attr("class", "col-2 bg-primary border rounded text-light p-2 m-2")

        //Date
        const event = new Date(cube[i].dt*1000);
        let dateValue = $("<p><strong>" + event.toDateString() + "</strong></p>")
        dateValue.attr("class", "row")
        forecastBlock.append(dateValue);

        //Waether icon
        let currentConditions = $("<p><strong>Sky Condition:</strong></p>")
        let weatherIcon = $("<img>")
        weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + cube[i].weather[0].icon + "@2x.png")
        currentConditions.attr("class", "row")
        currentConditions.append(weatherIcon)
        forecastBlock.append(currentConditions)

        //Temperatue 
        let currentTemp = cube[i].temp.day;
        currentTemp = (currentTemp - 273.15) * 1.80 + 32;
        let tempDisplay = $("<p><strong>Temperature:</strong> "+ currentTemp.toFixed(2) + "°F</p>")
        tempDisplay.attr("class", "row")
        forecastBlock.append(tempDisplay);

        //Humidity
        let currentHumidity = $("<p><strong>Humidity:</strong> "+ cube[i].humidity +"%</p>")
        currentHumidity.attr("class", "row")
        forecastBlock.append(currentHumidity);

        //Appends Blocks to Column
        fiveDays.append(forecastBlock);
    }

    fiveDayForecast.append(fiveDays);
    
}

newButton();
           
