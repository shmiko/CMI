(function() {
    'use strict';

    angular
        .module('introduction')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($routeProvider) {
        // setup translations path
        // $translatePartialLoaderProvider.addPart('app/examples/introduction');

        // add routes
        $routeProvider
        .route('introduction', {
            url: '/introduction',
            templateUrl: 'app/introduction/introduction.tmpl.html',
            controller: 'IntroductionController',
            controllerAs: 'vm'
        })
        .route('hexback', {
            url: '/hexback',
            templateUrl: 'app/introduction/hexback.html'
            // controller: 'IntroductionController',
            // controllerAs: 'vm'
        });

        
    }
})();