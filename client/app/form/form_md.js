var app = angular.module('StarterApp', ['ngMaterial']);

app.config(function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('light-blue')
    .backgroundPalette('blue-grey')
    .dark();
});

app.controller('AppController', function($mdSidenav) {
  var vm = this;

  vm.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

});