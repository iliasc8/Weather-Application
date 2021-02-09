
var Weather
var Weather2
var list = document.querySelector('.output');
document.querySelector("#button-addon2").addEventListener("click", function () {
  var city = document.querySelector("#cityName").value
  GetWeather(city)
})


var multipleCities = []
if (JSON.parse(localStorage.getItem("City Search History"))) {
  multipleCities = JSON.parse(localStorage.getItem("City Search History"))
  GetWeather(multipleCities[multipleCities.length - 1])
}

function makeInitialList() {
  if (multipleCities.length == 0) {
    return
  }
  for (i = 0; i < multipleCities.length; i++) {
    var listItem = `<li>${multipleCities[i]}</li>`;
    list.innerHTML += listItem;
  }
}
makeInitialList();

function makeListItem(city) {
  var listItem = `<li>${city}</li>`;
  list.innerHTML += listItem;

}

document.querySelector('.output').addEventListener('click', function (event) {
  GetWeather(event.target.textContent);
})


async function GetWeather(city) {
  console.log(multipleCities.indexOf(city))
  if (multipleCities.indexOf(city) === -1) {

    multipleCities.push(city);
    localStorage.setItem("City Search History", JSON.stringify(multipleCities));
    makeListItem(city);
  }



  Weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=166a433c57516f51dfab1f7edaed8413&units=imperial`).then(r => r.json())
  // console.log(Weather)
  document.querySelector(".current-date").innerHTML = moment().format('MMMM Do YYYY');
  document.querySelector(".day1date").innerHTML = moment().add(1, 'day').format('L')
  document.querySelector(".day2date").innerHTML = moment().add(2, 'day').format('L')
  document.querySelector(".day3date").innerHTML = moment().add(3, 'day').format('L')
  document.querySelector(".day4date").innerHTML = moment().add(4, 'day').format('L')
  document.querySelector(".day5date").innerHTML = moment().add(5, 'day').format('L')

  document.querySelector('.city').innerHTML = `${Weather.name}`
  document.querySelector('.tempF').innerHTML = `Temperature: ${Weather.main.temp} °F`
  document.querySelector('.humidity').innerHTML = `Humidity: ${Weather.main.humidity} %`
  document.querySelector('.wind').innerHTML = `Wind: ${Weather.wind.speed} MPH`

  document.getElementById('iconDay1').src = `http://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`
  var lon = Weather.coord.lon
  var lat = Weather.coord.lat
  Weather2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=0083f8aab5689475736360278718f8af&units=imperial`).then(r => r.json())
  document.querySelector('.uv').innerHTML = `UVI: ${Weather2.current.uvi}`


  for (var i = 0; i < 5; i++) {
    document.querySelector(`.day${i + 1}temp`).innerHTML = `Temperature: ${Weather2.daily[i].temp.day} °F`
    document.querySelector(`.day${i + 1}humidity`).innerHTML = `humidity: ${Weather2.daily[i].humidity} %`
    document.querySelector(`.day${i + 1}icon`).src = `http://openweathermap.org/img/wn/${Weather2.daily[i].weather[0].icon}@2x.png`
  }


}