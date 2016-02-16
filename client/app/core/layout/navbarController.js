(function () {

    var injectParams = ['$scope', '$location'];

    var navbarController = function ($scope, $location) {
        var vm = this,
            appTitle = 'CalMapIt MashApp';

        vm.isCollapsed = false;
        vm.appTitle = appTitle;

        // vm.item.who = 'PRJ';
        // vm.item.what = 'USA';
        // vm.item.notes = 'travel around the countryside';

    };

    navbarController.$inject = injectParams;

    angular.module('cmiApp').controller('navbarController', navbarController);

}());
