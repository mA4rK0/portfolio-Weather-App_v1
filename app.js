const apiKey = "976738fbfb3c9578f1994b018302c20d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityDis = document.querySelector(".city");
const weatherIcon = document.querySelector(".change img");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  try {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = await axios.get(`${apiUrl}${city}&appid=${apiKey}`, config);
    console.log(res);

    const data = res.data;
    if (cityDis && weatherIcon) {
      cityDis.innerHTML = data.name;

      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // * Clear previous weather icon
      weatherIcon.src = "https://openweathermap.org/img/wn/";

      // * change the weather icon
      let changeIcon = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${changeIcon}.png`;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    if (cityDis && weatherIcon) {
      cityDis.innerHTML = "Error! City not found.";
    }
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value !== "") {
    cityDis.innerHTML = "Getting the data...";
    checkWeather(searchBox.value);
  }
});
