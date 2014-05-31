var request = require('request');
var feedread = require("feed-read");

var Feed = function(url) {this.url = url;};
Feed.prototype.url = '';
Feed.prototype.title = '';
Feed.prototype.episodes = [];

Feed.prototype.fetch = function(callback) {
  if (this.url) {
    var self = this;
    var parsed_feed;

    setValues = function(err, articles) {
      if (articles.length > 0) {
        self.title = articles[0].feed.name;
        self.episodes = articles;

        callback(null, self);
      }
    };
    
    request({
      uri: this.url,
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    }, function(error, response, body) {
      var feed_type = feedread.identify(body);
      parsed_feed = feedread[feed_type](body, setValues);
    });
  }
};

module.exports = Feed;
