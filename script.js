async function getWeather() {

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Enter city name!");
        return;
    }

    let apiKey = "bbcb1370b699f158cbe693274ccac664"; 

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === "404") {
    document.getElementById("temp").innerText = "--°C";
    document.getElementById("cityName").innerText = "City not found";
    document.getElementById("humidity").innerText = "--%";
    document.getElementById("wind").innerText = "-- km/h";
    return;
}

    // 🌡️ Data update
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed + " km/h";
    document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

    // 🌤️ ICON CHANGE LOGIC
    let weatherCondition = data.weather[0].main;
    let icon = document.querySelector(".weather-icon");

    if (weatherCondition === "Clouds") {
        icon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    }
    else if (weatherCondition === "Rain") {
        icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
    }
    else if (weatherCondition === "Clear") {
        icon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    }
    else if (weatherCondition === "Snow") {
        icon.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
    }
    else {
        icon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    }
}

window.onload = function() {
    document.getElementById("city").value = "Mumbai";
    getWeather();
};