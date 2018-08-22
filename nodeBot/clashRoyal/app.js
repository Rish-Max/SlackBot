// const CRoyale = require('croyale');
// const client = new CRoyale.Client('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTgyLCJpZGVuIjoiNDYwNDY0MDMxMDg2NTQyODQ4IiwibWQiOnsidXNlcm5hbWUiOiJNYXhIb2ciLCJrZXlWZXJzaW9uIjozLCJkaXNjcmltaW5hdG9yIjoiNjYwMiJ9LCJ0cyI6MTUzMTg1MDcyNTYyOX0.zj0If4JawA9cHztZviNqvWkErIxsPI5Lhc8-znOX9GI');
 
// client.getPlayer('82ROC82J2', { keys: ['name'] })
//     .then(player => {
//         console.log(`The player's name is ${player.name}`);
//     });
 
const express = require('express');
const app = express();
var request = require("request");


    app.get('/',(req,res) =>{
        var options = { method: 'GET',
    url: 'https://api.royaleapi.com/player/JL8YLLU0',
    headers: { auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTgyLCJpZGVuIjoiNDYwNDY0MDMxMDg2NTQyODQ4IiwibWQiOnsidXNlcm5hbWUiOiJNYXhIb2ciLCJrZXlWZXJzaW9uIjozLCJkaXNjcmltaW5hdG9yIjoiNjYwMiJ9LCJ0cyI6MTUzMTg1MDcyNTYyOX0.zj0If4JawA9cHztZviNqvWkErIxsPI5Lhc8-znOX9GI' }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log("i m working");
    var get = JSON.parse(body);
    var images =" ";
    for (const image of get.currentDeck) {
      images += '<img src="'+image.icon+'" height="100px" width="100px"><p>'+ image.description +'</p>' ;
    }
    res.send(images); 
  });
    })  

    app.listen(3020);

    //Tokken
    //xoxb-399788503424-402257580775-6lwVewy9zBEavASFX9fa6orN
    //wit Tokken
    //curl \
    //  -H 'Authorization: Bearer UGYYHKQ73GITTDUFG57RMR36DTMQFSBK' \
   //  'https://api.wit.ai/message?v=20180721&q='
   //google Maps Api Key
   //AIzaSyAlXNzApbcdXceJnlowmb3SwjiP1eoLpW0
   //weather
   //0b362320594fb7fc213b46a27ffc8c09d