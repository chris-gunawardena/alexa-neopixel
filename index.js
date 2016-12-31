

var mosca = require('mosca');
var mqtt_server = new mosca.Server({
  port: 1883,
  backend: {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
  }
});

mqtt_server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

mqtt_server.on('published', function(packet, client) {
  console.log('message is received: ', packet.payload);
});

mqtt_server.on('ready', function setup() {
  console.log('Mosca server is up and running');
});




var https = require('https');
var fs = require('fs');
var options = {
     key: fs.readFileSync('/etc/letsencrypt/live/alexa.gunawardena.id.au/privkey.pem'),
     cert: fs.readFileSync('/etc/letsencrypt/live/alexa.gunawardena.id.au/fullchain.pem'),
     ca: fs.readFileSync('/etc/letsencrypt/live/alexa.gunawardena.id.au/chain.pem')
}
var app = function (req, res) {
  server.publish({
    topic: '/hello/world',
    payload: 'abcde', // or a Buffer
    qos: 0, // 0, 1, or 2
    retain: false // or true
  }, function() {
    console.log('done!');
  });
  res.writeHead(200);
  res.end("{ \"x\": 123 }");
}
var https_server = https.createServer(options, app);
https_server.listen(443);

