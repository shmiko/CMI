﻿(function () {

    var injectParams = ['$scope', '$location'];

    var navbarController = function ($scope, $location) {
        var vm = this,
            appTitle = 'CalMapIt MashApp';

        vm.isCollapsed = false;
        vm.appTitle = appTitle;



    };

    navbarController.$inject = injectParams;

    angular.module('cmiApp').controller('navbarController', navbarController);

}());
