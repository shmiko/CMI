angular.module('ngMap').controller('directionsController',function(){
        this.myFunc = function() {
          console.log('length: ' + this.directions.routes[0].overview_path.length);
        };
      })