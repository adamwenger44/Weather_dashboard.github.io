// starting the function
function searchCities(city) {

    // linking API, the city variable will be defined later based on what the user asks for in search bar
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a2f114a1cf090b8cddc1101cf0bd792c"


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        console.log(queryURL)
        // using another ajax call and API to get the icon that visually shows what the weather is like
        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        $.ajax({
            url: iconURL,
            method: "GET"
        }).then(function (iconPic) {
            // using a math.round to convert the temperature into farenheight
            var tempF = Math.round((response.main.temp - 273.15) * 1.80 + 32)
            console.log(iconURL)
            // creating img tag in jQuery so that for each item searched, a new icon is created
            var myImg = $('<img />', {
                id: 'pic',
                src: iconURL,
                alt: 'Alt text',
                style: "float: left"
            });
            // gets todays date
            var d = new Date();
            var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            // creats a header for the displayed info, it has the city name the user typed in, todays date, and the icon
            var cityName = $("<h3>").text(response.name + " " + strDate).append(myImg)
            cityName.css("font-size", "25px")
            // creating div for temperature, calling the variable above that turned it into farenheight
            var cityTemp = $("<div>").text("Temperature: " + tempF + "*F")
            // creating div for humidity
            var cityHumidity = $("<div>").text("Humidity: " + response.main.humidity + "%")
            // creating div for wind speed
            var cityWind = $("<div>").text("Wind Speed: " + response.wind.speed + " mph")
            // prepending all of this info into a id called results, prepending so that the most recent information is at top of page
            $("#results").prepend(cityName, cityTemp, cityHumidity, cityWind)
            // reseting the search box so user doesnt have to delete previous info manually
            $("#cityName").val("")

        })
    });
}

// event listener for the submit button
$(".btnSearch").on("click", function (event) {
    event.preventDefault();
    // gets the city that the user typed in, and trims it to avoid unessesary spaces
    var inputCity = $("#cityName").val().trim();
    console.log(inputCity)
    // using this city as the new perameter for the function above, so it calls the correct city when using API
    searchCities(inputCity)
})

console.log(window)