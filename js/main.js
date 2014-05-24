(function() {
    var self = this;
    
    var Catcher = function(){};
    Catcher.prototype.removeShow = function($podcast) {        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/remove");
        xmlhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xmlhttp.send($podcast.getAttribute('data-id'));
    };
    
    var catcher = new Catcher();
    var $removers = document.getElementsByClassName('remove');
    
    for (var i = 0; i < $removers.length; i++) {
        console.log(catcher);
        $removers[i].addEventListener('click', function() {
            catcher.removeShow(this)
        });
    }
})();