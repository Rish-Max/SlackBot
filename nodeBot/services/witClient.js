 
const request = require('superagent');

function handleOnResponse(res){
    return res.entities;
} 

module.exports = function webClient(token){
    
    const ask = function ask(message,cb){
        request.get('https://api.wit.ai/message')
           .set('Authorization','Bearer '+token)
           .query({v:'20180721'})
           .query({q:message})
           .end((err,res) => {
               if(err) return cb(err);

               if(res.statusCode != 200) return cb("Expected status 200 and got undefined status");

               const witResponse = handleOnResponse(res.body);
                return cb(null,witResponse);        
           })
          console.log("ask : ",message);
          console.log("tokken : ",token);
      }
      return{
          ask : ask
      }
};