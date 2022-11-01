const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
const cityName = req.body.cityName ;
const apiKey = "da7949ae6d10fe45ed9cad71da3abb85";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+ unit +"&appid="+apiKey;

https.get(url, function(response){
response.on("data", function(data){
   const weatherData = JSON.parse(data);
   console.log(weatherData);
  const temp = weatherData.main.temp;
  const weatherdescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
res.write("<h1> The current weather of  <span style='color: blueviolet; font-size:40px;'>"+ cityName +" </span>   is <span style='color: green;'> "+ weatherdescription +"</span> and temprature is <span style='color: blue;'>"+temp+" </span> degree celcius</h1>");
res.write("<img src="+imageUrl+">");
res.send();
});
});
});


app.listen(3000, function(){
    console.log('listening on http://localhost:3000');
})