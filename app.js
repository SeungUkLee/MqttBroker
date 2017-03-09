var mosca = require('mosca'); //
var server = require('./lib/server');
var mongoose = require('mongoose');

var ascoltatore = {
  type : 'redis',
  redis : require('redis'),
  db : 12,
  port : 6379,
  return_buffers: true, // to handle binary payloads
  host : 'localhost' };

var settings = {
    port : 1883,
    backend : ascoltatore ,
    persistence: {
      factory: mosca.persistence.Redis
    }
  };

// var pubsubsettings = {
//   type : 'mongo',
//   url : 'mongodb://52.79.198.44:27017/projecttest',
//   pubsubCollection : 'ascoltatori',
//   mongo : {}
// };
//
// var settings = {
//   port : 1883,
//   backend : pubsubsettings
// };

var app = new server.start(settings);

app.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

app.on('published', function(packet, client) {
  //console.log('MQTT Broker Published');
   if(packet.topic.indexOf('$SYS') === 0) {
  //   console.log('$SYS packet : ', packet);
     return; //<- $SYS 에 대해서 알아봐야될듯... ㅠㅠ
   }
  console.log('On published packet : ', packet);
  console.log('On published', packet.payload.toString(), 'on topic', packet.topic);
});

app.on('ready', function() {
  console.log('MQTT Broker listening on port', 1883);
});


// mongoose.connect('mongodb://localhost:27017/devices_development');
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function(){
//     console.log('connected to mongodb server');
// });
