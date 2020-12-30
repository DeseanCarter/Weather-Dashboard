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

 console.log("KEY", myKey )
//when i click on the search button 
searchButton.on("click", function() {
    searchForCity();
    //value of searchField
    searchField.val("");
} )
    
function searchForCity() {
    //check to make sure this is a valid input (city name not skljdfksj or 2478834 or lizard) - only checks for pure numbers
   if(!parseInt(searchField.val().trim())) {
        console.log("hello");
        //local storage
        localStorage.setItem("search", searchField.val().trim());
        newButton();
        generateWeather(searchField.val().trim())
   }else {
       alert("Enter a valid city name, Use only letters")
   }
   
};    
   
    //grab current value of searchField
    //make a button
function newButton() {
    let button = $("<button>")
     //give text and value equal to searchField
    button.val(localStorage.getItem("search"));
    button.text(localStorage.getItem("search"))
    //give button class.searchedCity
    button.attr("class", "searchedCity");
    //when i click the button
    button.on("click", function() {
        generateWeather(button.val())
    }) 
    //append button to cityHistory
    cityHistory.append(button);
}    

//call weather API
    //give it a city name with crocodile
function generateWeather(crocodile) {
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ crocodile + "&appid=" + myKey;

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

    //give city name
    //return a response

            //give text and value equal to searchField
            //append button to cityHistory
                //when i click this button, todayCast and fiveCast are ppulated w/ info on this button's value
    //populate todayCast w/ info 
function contructToday(crocodile) {
    todaysForecast.empty();
    let cityName= $("<p><strong>City Name:</strong> "+ crocodile.name + "</p>")
    todaysForecast.append(cityName)
    const event = new Date(crocodile.dt*1000);
    //console.log(event.toDateString());
    let todayDate = $("<p><strong>Today's Date:</strong> "+ event.toDateString() + "</p>")
    todaysForecast.append(todayDate);
    let currentConditions = $("<p><strong>Current Conditions:</stong> "+ crocodile.weather[0].description + "</p>")
    let weatherIcon = $("<img>")
    weatherIcon.attr("src",
                "http://openweathermap.org/img/wn/" + crocodile.weather[0].icon + "@2x.png"
    )
    currentConditions.append(weatherIcon)
    todaysForecast.append(currentConditions)
    let currentTemp = crocodile.main.temp;
    currentTemp = (crocodile.main.temp - 273.15) * 1.80 + 32;
    let tempDisplay = $("<p><strong>Current Temperature:</strong> "+currentTemp.toFixed(2) + "°F</p>")
    todaysForecast.append(tempDisplay);
    let currentHumidity = $("<p><strong>Humidity:</strong> "+ crocodile.main.humidity + "%</p>")
    todaysForecast.append(currentHumidity);
    let windSpeed = $("<p><strong>Wind Speed:</strong> "+ (crocodile.wind.speed * 2.237).toFixed(2) + "mph</p>")
    todaysForecast.append(windSpeed);
    
    // ultraviolet.attr("style", "background-color", "blue")
    //crocodile.coord.lat + corcodile.coord.lon into ajax url
    
    var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ crocodile.coord.lat + "&lon=" + crocodile.coord.lon + "&exclude=alerts&appid=" + myKey;

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
        //city name
        //the date
        //an icon representation of weather condition
        //the temp
        //the humidity
        //wind speed
        //uv index
            //uv index is displayed in color coded field
                //three codes
                    //favorable
                    //moderate
                    //or severe


    //populate fivCast w info
        //create div - 5 times
            //give new background
            //fill w todays date + 1 info
                // the date
                //an icon representation of weather ocndition
                //the temp
                //the humidity   
                
                
    //when i refresh,
        //i populate todayCast and fiveCas with last search
        //*****I populate cityHistory with search history with local storage
        newButton();
            //***append button to cityHistory to clear search history
