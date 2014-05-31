var Subscriptions = function() {};

Subscriptions.prototype.shows = [];

Subscriptions.prototype.addShow = function(feed, callback) {
  if (feed.hasOwnProperty('title') && feed.hasOwnProperty('episodes')) {
    this.shows.push(feed);
  }
  callback(null, this.shows);
};

Subscriptions.prototype.removeShow = function(feed) {
  for (var i; i < this.shows.length; i++) {
    if (this.shows[i].title === feed.title) {
      this.shows.splice(i, 1);
    }
  }
};

module.exports = Subscriptions;
