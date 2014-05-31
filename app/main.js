(function() {
    var self = this;

    var Catcher = function(){};
    Catcher.prototype.apiCall = function(method, endpoint, data, callback) {
      var req = new XMLHttpRequest();
      req.open(method, endpoint);
      req.send(data);
      req.onreadystatechange = function() {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
          // alert('HTTP error ' + req.status);
          return;
        }
        callback(req.responseText);
      };
    };
    Catcher.prototype.removeShow = function(show) {
      this.apiCall('POST', '/remove', show, updateShowList);
    };
    Catcher.prototype.addShow = function(show) {
      console.log(show);
      this.apiCall('POST', '/add', show, updateShowList);
    };

    updateShowList = function(list) {
      console.log(list);
    };

    var catcher = new Catcher();
    var $removers = document.getElementsByClassName('remove');
    var $add_button = document.getElementsByClassName('add-feed');
    $add_button = $add_button[0];

    // Buttons listeners
    $add_button.addEventListener('click', function() {
      catcher.addShow(document.getElementsByClassName('rss-input')[0].value);
    }, false);

    var remove = function($remover) {catcher.removeShow($removers[i]);};
    for (var i = 0; i < $removers.length; i++) {
        $removers[i].addEventListener('click', remove($removers[i]), false);
    }
})();
