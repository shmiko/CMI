angular.module('ngMap').controller('directionsController',function(){
        this.myFunc = function() {
          alert('length: ' + this.directions.routes[0].overview_path.length);
        };
      })