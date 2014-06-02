var request = require('request');
var feedread = require("feed-read");
var cheerio = require('cheerio');

var Feed = function(url) {this.url = url;};
Feed.prototype.url = '';
Feed.prototype.title = '';
Feed.prototype.episodes = [];

Feed.prototype.fetch = function(callback) {
  if (this.url) {
    var self = this;
    var parsed_feed;
    var raw_feed;

    setValues = function(err, articles) {
      if (articles.length > 0) {
        self.title = articles[0].feed.name;
        self.episodes = articles;

        var doc = cheerio.load(
          raw_feed,
          {
            normalizeWhitespace: true,
            xmlMode: true
          }
        );
        var parsed_episode_objects = doc('item');
        if (articles.length === parsed_episode_objects.length){
          // This is a rough one. articles comes from feedreader and the I'm iterating over the "raw" feed
          // separately to get the episode media URL. Need a more reliable method, but this works for now.
          for (var x = 0; x < articles.length; x++) {
            for (var i = 0; i < parsed_episode_objects[x].children.length; i++) {
              if (parsed_episode_objects[x].children[i].name === 'enclosure') {
                articles[x].episode_url = parsed_episode_objects[x].children[i].attribs.url;
                articles[x].episode_type = parsed_episode_objects[x].children[i].attribs.type;
              }
            }
          }
        }

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
      raw_feed = body;
      var feed_type = feedread.identify(body);
      parsed_feed = feedread[feed_type](body, setValues);
    });
  }
};

module.exports = Feed;
