const API_KEY = `5d6c2d18b7ff93b2f553fcff890d08ec`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const pressure = document.querySelector('#pressure');

const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data);
};

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h6> Not Valid <h6>`;
        return;
    }
    const updateDateTime = () => {
        const d = new Date();
        const formattedDate = `${d.toLocaleDateString(undefined, { weekday: 'long' })}, ${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
        document.querySelector('#dateTime').innerHTML = formattedDate;
    };
    setInterval(updateDateTime, 1000);

    const d = new Date();
    const formattedDate = `${d.toLocaleDateString(undefined, { weekday: 'long' })}, ${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
    weather.innerHTML = `
        <div>
            <h4 id="dateTime">${formattedDate}</h4>
            <h1> City: ${data.name}</h1>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h3> ${data.weather[0].main} </h3><br>
            <h3> Temperature: ${data.main.temp} ℃</h3>
            <h4>Pressure: ${data.main.pressure}hPa </h4>
            <h4>Humidity: ${data.main.humidity} % </h4>
            <h4>WindSpeed: ${data.wind.speed} km/h </h4>
        </div>
    `;
};

// Call getWeather() function with default city name when page loads
window.addEventListener("load", () => {
    getWeather("falkirk");
});

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value);
        event.preventDefault();
    }
);
