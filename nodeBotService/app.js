const express = require('express');
const app = express();
const request = require('superagent');
const moment = require('moment');

//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY;
//https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY;
app.get('/map/:location',(req,res) =>{
  let add=req.params.location;

  request.get('https://maps.googleapis.com/maps/api/geocode/json')
  .query({address : add})
  .query({key : 'AIzaSyAlXNzApbcdXceJnlowmb3SwjiP1eoLpW0'})
  .end((err,response) => {
       let location = response.body.results[0].geometry.location;
       let timestamp = +moment().format('X');   

       request.get('https://maps.googleapis.com/maps/api/timezone/json')
       .query({location : location.lat+','+location.lng})
       .query({timestamp : timestamp})
       .query({key : 'AIzaSyAlXNzApbcdXceJnlowmb3SwjiP1eoLpW0'})
       .end((err,response) => {
           if(err)
           { 
             res.send({msg : "city not found"});
           }
           else{
           let results = response.body;
           let timeString = moment.unix(timestamp + results.dstOffset + results.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

           res.send({result : timeString});
           }
    })  
  })
});

app.get('/weather/:location',(req,res) =>{
    let add=req.params.location;

    request.get('api.openweathermap.org/data/2.5/weather')
       .query({q:add})
       .query({units : 'metric'})
       .query({APPID : '0b362320594fb7fc213b46a27ffc8c09'})
       .end((err,response) =>{
             if(err)
             {
                 console.log(err);
                 res.send({msg : "City not found"});
             }
             else{
                let result = response.body; 
                 res.send({ maxTemp:result.main.temp_max,minTemp:result.main.temp_min,climate:result.weather[0].description})
             }
        
       })
})

app.listen(3010,(err,res) =>{
    if(err)
    consoel.log(err);

    else
    console.log("maps working");
})