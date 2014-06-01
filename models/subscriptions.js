var Subscriptions = function() {};

Subscriptions.prototype.shows = [];

Subscriptions.prototype.addShow = function(feed, callback) {
  if (feed.hasOwnProperty('title') && feed.hasOwnProperty('episodes')) {
    this.shows.push(feed);
  }
  callback(null, this.shows);
};

Subscriptions.prototype.removeShow = function(title, callback) {
  for (var i = 0; i < this.shows.length; i++) {
    console.log(this.shows[i]);
    if (this.shows[i].title === title) {
      this.shows.splice(i, 1);
    }
    callback(null, this.shows);
  }
};

module.exports = Subscriptions;
