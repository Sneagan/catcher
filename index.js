var Hapi = require('hapi');
var Feed = require('./models/feed');
var Subscriptions = require('./models/subscriptions');

var options = {
  views: {
    path: 'templates',
    engines: {
      hbs: 'handlebars'
    }
  }
};

// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000, options);

var subscriptions = new Subscriptions();


var index = {
  handler: function (req, reply) {
    // Render the view
    reply.view('index.hbs', {});
  }
};

var add = {
  handler: function(req, reply) {
    var feed = new Feed(req.payload.podcast);
    // Passing subscriptions and its add function to be bound when fetch completes. Async
    feed.fetch(subscriptions.addShow, subscriptions);
  }
};


// Add the route
server.route({
  method: 'GET',
  path: '/',
  config: index
});

server.route({
  method: 'POST',
  path: '/add_feed',
  config: add
});

server.route({
  method: 'DELETE',
  path: '/quote/{id}',
  handler: function(req, reply) {
    if (quotes.length <= req.params.id) {
      return reply('No quote found.').code(404);
    }
    quotes.splice(req.params.id, 1);
    reply(true);
  }
});

// Start the server
server.start();
