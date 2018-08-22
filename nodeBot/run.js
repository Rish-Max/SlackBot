var Services = require('./services/service');
const SlackClient = require('./services/slackClient');

const http = require('http');

const server = http.createServer(Services);

const token = "xoxb-399788503424-402257580775-6lwVewy9zBEavASFX9fa6orN";

const witToken = 'UGYYHKQ73GITTDUFG57RMR36DTMQFSBK';
const witClient = require('./services/witClient')(witToken);

const rtm = SlackClient.init(token,witClient); 
rtm.start();

SlackClient.checkAuhetication(rtm,() => server.listen(3000));

server.on('listening',(err) => {
  if(err)
  console.log(err);

  else
  console.log('i m listing at the port 3000 ');
});