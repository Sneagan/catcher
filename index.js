var Hapi = require('hapi');
var Feed = require('./models/feed');
var Subscriptions = require('./models/subscriptions');
var async = require('async');

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

var removeDuplicates = function(unfiltered, callback) {
  // Currently checks for episodes. Should also check for dupes
  if (callback) {
    if (unfiltered instanceof Array) {
      callback(true);
      return;
    }
    callback(false);
  }
};


var index = {
  handler: function (req, reply) {
    // Render the view
    reply.view('index.hbs', {});
  }
};

var add = {
  handler: function(req, reply) {
    var feed = new Feed(req.payload);

    async.series([
      function(callback) {
        feed.fetch(callback);
      },
      function(callback) {
        subscriptions.addShow(feed, callback);
      }
    ],
    function(err, results){
      async.filter(results, removeDuplicates,
        function(results) {
          reply({subscriptions: results[0]});
        }
      );
    });
  }
};

var remove = {
  handler: function(req, reply) {
    async.series([
      function(callback) {
        subscriptions.removeShow(req.payload, callback);
      }
    ],
    function(err, results){
      async.filter(results, removeDuplicates,
        function(results) {
          reply({subscriptions: results[0]});
        }
      );
    });
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
  path: '/add',
  config: add
});

server.route({
  method: 'DELETE',
  path: '/remove',
  config: remove
});

// Serve static resources
server.route({
    method: 'GET',
    path: '/app/{path*}',
    handler: {
        directory: { path: './app', listing: false, index: true }
    }
});
server.route({
    method: 'GET',
    path: '/css/{path*}',
    handler: {
        directory: { path: './css', listing: false, index: true }
    }
});

// Start the server
server.start();
