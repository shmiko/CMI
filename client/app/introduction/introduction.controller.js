(function() {
    'use strict';

    angular
        .module('introduction')
        .controller('IntroductionController', IntroductionController);

    /* @ngInject */
    function IntroductionController(cmiSettings) {
        var vm = this;
        vm.version = cmiSettings.version;
        vm.featureRows = [
            [{
                name: 'Google Calendar',
                icon: 'zmdi zmdi-laptop',
                palette: 'cyan',
                hue: '200'
            },{
                name: 'Google Maps',
                icon: 'zmdi zmdi-palette',
                palette: 'cyan',
                hue: '300'
            },{
                name: 'Itinerary',
                icon: 'zmdi zmdi-share',
                palette: 'cyan',
                hue: '400'
            },{
                name: 'Travel Hacks',
                icon: 'zmdi zmdi-star',
                palette: 'cyan',
                hue: '500'
            }],
            [{
                name: 'Bucket lists',
                icon: 'fa fa-google',
                palette: 'cyan',
                hue: '600'
            },{
                name: 'Trips',
                icon: 'fa fa-th-large',
                palette: 'cyan',
                hue: '700'
            },{
                name: 'Control Panel',
                icon: 'fa fa-terminal',
                palette: 'cyan',
                hue: '800'
            },{
                name: 'Social Media Connected',
                icon: 'fa fa-css3',
                palette: 'cyan',
                hue: '900'
            }]
        ];
    }
})();
