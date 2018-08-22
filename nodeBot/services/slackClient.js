const { RTMClient } = require('@slack/client');
const request = require('superagent');
let rtm = null;
let nlp = null;

function handleOnMessage(message){
  //console.log(message);
  if(message.text.toLowerCase().includes('soni') || message.text.includes('@UBU7KH2NT') ){
    nlp.ask(message.text,(err,res) =>{
        console.log(message);
        if(err){
        console.log(err);
         return;
        }
         
        if(res.greetings && !res.intent){
            return rtm.sendMessage("Hii"+"<@"+message.user+">I m a bot \n I can tell you about time and climate of different cities \n Try It!!!",message.channel).then(
                (res) => console.log("Message Sent:"+JSON.stringify(res))
            ).catch( console.error);    
        }

        if(!res.intent){
          return rtm.sendMessage("Sorry i don't know what u are saying"+"<@"+message.user+">",message.channel).then(
              (res) => console.log("Message Sent:"+JSON.stringify(res))
          ).catch( console.error);    
        }
        
        
        else if((( res.intent[0].value ==  'temp' || res.intent[0].value == 'climate') && ( res.intent[0].value == 'time')) && res.location){
            return rtm.sendMessage("Can u ask one at a time <@"+message.user+">",message.channel).then(
                (res) => console.log("Message Sent:"+JSON.stringify(res))
            ).catch( console.error);
         }

        else if((res.intent[0].value == 'time' || res.intent[0].value ==  'temp' || res.intent[0].value == 'climate') && !res.location){
            return rtm.sendMessage("Please specify the city",message.channel).then(
                    (res) => console.log("Message Sent:"+JSON.stringify(res))
                ).catch( console.error);        
          }
  
        else if((res.intent[0].value == 'time') && res.location){
            
            request.get('http://localhost:3010/map/'+res.location[0].value,(err,response) =>{
                if(err)
                {
                    console.log(err);
                    return ;
                }
               
                else if(response.body.msg == "City not found")
                {
                    return rtm.sendMessage("Sorry,city not found",message.channel).then(
                        (res) => console.log("Message Sent:"+JSON.stringify(res))
                    ).catch( console.error);
                }

                console.log(res.location.value);
                return rtm.sendMessage("In "+res.location[0].value +",Its now " + response.body.result,message.channel).then(
                    (res) => console.log("Message Sent:"+JSON.stringify(res))
                ).catch( console.error);

            })


        //   return rtm.sendMessage(message.text,message.channel).then(
        //           (res) => console.log("Message Sent:"+JSON.stringify(res))
        //       ).catch( console.error);        
         }

         else if(( res.intent[0].value ==  'temp' || res.intent[0].value == 'climate') && res.location){
            
            request.get('http://localhost:3010/weather/'+res.location[0].value,(err,response) =>{
                if(err)
                {
                    console.log(err);
                    return ;
                }

                else if(response.body.msg == "City not found")
                {
                    return rtm.sendMessage("Sorry,city not found",message.channel).then(
                        (res) => console.log("Message Sent:"+JSON.stringify(res))
                    ).catch( console.error);
                }
                console.log(res.location.value);
                return rtm.sendMessage("In "+res.location[0].value+",it will be "+ response.body.climate+" today \n min temperature " +response.body.minTemp + " *C & max temperature" + response.body.maxTemp+" *C",message.channel).then(
                    (res) => console.log("Message Sent:"+JSON.stringify(res))
                ).catch( console.error);

            })



        //   return rtm.sendMessage(message.text,message.channel).then(
        //           (res) => console.log("Message Sent:"+JSON.stringify(res))
        //       ).catch( console.error);        
         }
        
         
    });
  }
}

module.exports.init = function slackClient(token,nlpClient){
  rtm = new RTMClient(token);
  nlp = nlpClient
  rtm.on('message',handleOnMessage);
  return rtm;
} 

module.exports.checkAuhetication = function checkAuhetication(rtm,handler)
{
    rtm.on('authenticated',handler);
};

