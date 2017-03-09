var mongoose = require('mongoose');
var Device = require('../app/models/devices/device');

module.exports.authenticate = function(client, username, password, callback) {
  //console.log('authenticate client : ', client);
  console.log('authenticate username : ', username);
  console.log('authenticate password : ', password);

  Device.findOne({ _id : username, secret : password}, function(err, doc) {
    doc ? console.log('Authorized connection for device', doc.id) : console.log('Error connecting', username, password)

    console.log("Log doc :: ", doc);

    if (doc) {
      client.device_id = doc.id;
    }
    callback(null, doc);
  });
};

module.exports.authorizePublish = function(client, topic, payload, callback) {
  console.log('Authorizing subsribe', client.device_id == topic.split('/')[1]);
  console.log("Log client.device_id :: ", client.device_id);
  console.log("Log topic.split('/')[1] :: ", topic.split('/')[1]);
  console.log('PAYLOAD', payload.toString());
  console.log('TOPIC', topic);
  callback(null, client.device_id == topic.split('/'[1]));
};

module.exports.authorizeSubscribe = function(client, topic, callback) {
  console.log('Authorizing publish', client.device_id == topic.split('/')[1]);
  console.log("Log client.device_id :: ", client.device_id);
  console.log("Log topic.split('/')[1] :: ", topic.split('/')[1]);
  console.log('TOPIC', topic);
  callback(null, client.device_id == topic.split('/')[1]);
};
