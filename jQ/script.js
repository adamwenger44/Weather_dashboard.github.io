function searchCities(city) {


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a2f114a1cf090b8cddc1101cf0bd792c"


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        console.log(queryURL)
        var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
        $.ajax({
            url: iconURL,
            method: "GET"
        }).then(function (iconPic) {

            var tempF = Math.round((response.main.temp - 273.15) * 1.80 + 32)
            console.log(iconURL)
            var myImg = $('<img />', {
                id: 'pic',
                src: iconURL,
                alt: 'Alt text',
                style: "float: left"
            });
            var d = new Date();
            var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var cityName = $("<h3>").text(response.name + " " + strDate).append(myImg)
            var cityTemp = $("<div>").text("Temperature: " + tempF + "*F")
            var cityHumidity = $("<div>").text("Humidity: " + response.main.humidity + "%")
            var cityWind = $("<div>").text("Wind Speed: " + response.wind.speed + " mph")

            $("#results").prepend(cityName, cityTemp, cityHumidity, cityWind)

        })
    });
}


$(".btnSearch").on("click", function (event) {
    event.preventDefault();

    var inputCity = $("#cityName").val().trim();
    console.log(inputCity)

    searchCities(inputCity)
})

console.log(window)