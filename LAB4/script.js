const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");

let cachedWeather = null; 

const apiKey = "a7c588774f1b4dabf672490f4a9833f2";  

async function fetchWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    loading.style.display = "block";
    weatherResult.style.display = "none";
    errorDiv.textContent = "";

    try {
        const response = await fetch(url);  

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found (404)");
            }
            if (response.status === 401) {
                throw new Error("Invalid API key (401)");
            }
            throw new Error("Server error");
        }

        const data = await response.json();  

        
        cityName.textContent = data.name + ", " + data.sys.country;
        temperature.textContent = "Temperature: " + data.main.temp + " °C";
        humidity.textContent = "Humidity: " + data.main.humidity + " %";
        condition.textContent = "Condition: " + data.weather[0].description;

        weatherResult.style.display = "block";

        
        cachedWeather = data;

    } catch (err) {
        errorDiv.textContent = err.message;
    } finally {
        loading.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        searchBtn.click();
    }
});