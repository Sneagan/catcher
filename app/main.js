(function() {

  //fgnass.github.com/spin.js#v2.0.1
  !function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return l[e]||(m.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",m.cssRules.length),l[e]=1),e}function d(a,b){var c,d,e=a.style;for(b=b.charAt(0).toUpperCase()+b.slice(1),d=0;d<k.length;d++)if(c=k[d]+b,void 0!==e[c])return c;return void 0!==e[b]?b:void 0}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}m.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.width,left:d.radius,top:-d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.length+d.width,k=2*j,l=2*-(d.width+d.length)+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k=["webkit","Moz","ms","O"],l={},m=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}(),n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};h.defaults={},f(h.prototype,{spin:function(b){this.stop();{var c=this,d=c.opts,f=c.el=e(a(0,{className:d.className}),{position:d.position,width:0,zIndex:d.zIndex});d.radius+d.length+d.width}if(e(f,{left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.length+f.width+"px",height:f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.radius+"px,0)",borderRadius:(f.corners*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}});var o=e(a("group"),{behavior:"url(#default#VML)"});return!d(o,"transform")&&o.adj?i():j=d(o,"animation"),h});


    var self = this;

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

    // Start spinner
    var opts = {
      lines: 9, // The number of lines to draw
      length: 20, // The length of each line
      width: 15, // The line thickness
      radius: 35, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 50, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%' // Left position relative to parent
    };
    var target = document.getElementById('foo');
    var spinner = new Spinner(opts).spin(target);
    // End spinner

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
})();
