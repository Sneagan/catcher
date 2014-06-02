var self = this;
var Spinner = require('./vendor/spin');

var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

var spinner = new Spinner(opts).spin();

var Catcher = function(){};
Catcher.prototype.apiCall = function(method, endpoint, data, callback) {
  document.getElementById('shows').appendChild(spinner.el);
  var req = new XMLHttpRequest();
  req.open(method, endpoint);
  req.send(data);
  req.onreadystatechange = function() {
    if (req.readyState != 4) return;
    if (req.status != 200 && req.status != 304) {
      // alert('HTTP error ' + req.status);
      return;
    }
    document.getElementById('shows').removeChild(spinner.el);
    callback(req.responseText);
  };
};
Catcher.prototype.removeShow = function(show_title) {
  this.apiCall('DELETE', '/remove', show_title, updateShowList);
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

  var remove = function($remover) {
    catcher.removeShow($remover.srcElement.getAttribute('data-id'));
  };

  var showMore = function($element) {
    var elements = $element.target.parentNode.parentNode.childNodes;
    var toggleStatus = function(index) {
      if (elements[index].style.display === 'block') return 'none';
      else return 'block';
    };
    for (var i = 0; i < elements.length; i++) {
      if (i === 0) continue;
      elements[i].style.display = toggleStatus(i);
    }
  };

    for (var i = 0; i < list.subscriptions.length; i++) {
      var show = list.subscriptions[i];
      var $show_item = document.createElement('li');
      var $show_title = document.createElement('h2');
      $show_title.innerHTML = show.title;

      var $remover = document.createElement('span');
      $remover.innerHTML = 'Remove';
      $remover.className += 'remove';
      $remover.setAttribute('data-id', show.title);
      $remover.onclick = remove;

      $show_item.appendChild($show_title);
      $show_item.appendChild($remover);

      var $episode_container = document.createElement('ul');

      if (show.episodes && show.episodes.length) {
        for (var n = 0; n < show.episodes.length; n++) {
          var $episode = document.createElement('li');

          var $episode_title = document.createElement('h3');
          $episode_title.innerHTML = show.episodes[n].title;

          if (n === 0) {
            $episode.classList.add('first-episode');
            var $show_more = document.createElement('span');
            $show_more.innerHTML = 'More Episodes';
            $show_more.onclick = showMore;
            $episode.appendChild($show_more);
          } else {
            $episode.classList.add('old-episode');
          }

          var $episode_audio = document.createElement('audio');
          $episode_audio.src = show.episodes[n].episode_url;
          $episode_audio.controls = true;
          $episode_audio.setAttribute('type', show.episodes[n].episode_type);
          $episode_audio.setAttribute('preload', 'none'); // Too many episodes to preload data

          $episode.appendChild($episode_title);
          $episode.appendChild($episode_audio);

          $episode_container.appendChild($episode);
        }
      }
      $show_item.appendChild($episode_container);
      fragment.appendChild($show_item);
    }
  show_list.innerHTML = '';
  show_list.appendChild(fragment);
};

// Buttons listeners
$add_button.addEventListener('click', function() {
  catcher.addShow(document.getElementsByClassName('rss-input')[0].value);
}, false);
