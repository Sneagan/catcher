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
      this.apiCall('DELETE', '/remove', show, updateShowList);
    };
    Catcher.prototype.addShow = function(show) {
      this.apiCall('POST', '/add', show, updateShowList);
    };

    var catcher = new Catcher();
    var show_list = document.getElementById('shows');
    var $removers = document.getElementsByClassName('remove');
    var $add_button = document.getElementsByClassName('add-feed');
    $add_button = $add_button[0];

    updateShowList = function(list) {
      list = JSON.parse(list);
      var fragment = document.createDocumentFragment();

        for (var i = 0; i < list.subscriptions.length; i++) {
          var show = list.subscriptions[i];
          var $show_item = document.createElement('li');
          var $show_title = document.createElement('h2');
          $show_title.innerHTML = show.title;

          var $remover = document.createElement('span');
          $remover.innerHTML = 'Remove';
          $remover.className += 'remove';
          $remover['data-id'] = show.title;

          $show_item.appendChild($show_title);
          $show_item.appendChild($remover);

          var $episode_container = document.createElement('ul');

          if (show.episodes && show.episodes.length) {
            for (var n = 0; n < show.episodes.length; n++) {
              var $episode = document.createElement('li');

              var $episode_title = document.createElement('h3');
              $episode_title.innerHTML = show.episodes[n].title;

              var $episode_audio = document.createElement('audio');
              // fails because the server feedparser doesn't properly parse out the media url.
              $episode_audio.src = show.episodes[n].url;
              $episode_audio.controls = true;

              $episode.appendChild($episode_title);
              $episode.appendChild($episode_audio);
              $episode_container.appendChild($episode);
            }
          }
          $show_item.appendChild($episode_container);
          fragment.appendChild($show_item);
        }
      show_list.innerHTML = '';
      console.log(fragment);
      show_list.appendChild(fragment);
    };

    // Buttons listeners
    $add_button.addEventListener('click', function() {
      catcher.addShow(document.getElementsByClassName('rss-input')[0].value);
    }, false);

    var remove = function($remover) {catcher.removeShow($removers[i]);};
    for (var i = 0; i < $removers.length; i++) {
        $removers[i].addEventListener('click', remove($removers[i]), false);
    }
})();
