angular.module('mdapp', ['ngMaterial'])
.controller('AppCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.toggleLeft = function() {
    $mdSidenav('left').toggle();
  };
  $scope.toggleRight = function() {
    $mdSidenav('right').toggle();
  };
  
  $scope.menuLinks = [{title: 'Link 1', tooltip: 'Goes to link 1'}, {title: 'Link 2', tooltip: 'Goes to link 2'}, {title: 'Link 3', tooltip: 'Goes to link 3'}]
})

.controller('LeftCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('left').close();
  };
})

.controller('RightCtrl', function($scope, $timeout, $mdSidenav) {
  $scope.close = function() {
    $mdSidenav('right').close();
  };

  $mdSidenav('left').isLockedOpen();
 
 $scope.tasks = [
  {
    "what": "elit",
    "who": "Lorraine Henry",
    "when": "3:08PM",
    "notes": "Elit nisi nostrud ullamco fugiat commodo incididunt pariatur amet fugiat enim velit aute consectetur aliquip."
  },
  {
    "what": "officia",
    "who": "Kimberley Ellis",
    "when": "3:08PM",
    "notes": "Qui mollit ad magna anim ad culpa cillum do ad ex id fugiat."
  },
  {
    "what": "duis",
    "who": "Bray Fleming",
    "when": "3:08PM",
    "notes": "Culpa ex ea consequat anim Lorem pariatur elit tempor reprehenderit aute."
  },
  {
    "what": "ipsum",
    "who": "Gabriela Solis",
    "when": "3:08PM",
    "notes": "Occaecat veniam amet aute consequat quis excepteur laborum dolore ea commodo ea id veniam."
  },
  {
    "what": "dolor",
    "who": "Kathleen Craft",
    "when": "3:08PM",
    "notes": "Nisi aliqua elit do exercitation sit in elit voluptate amet minim culpa cillum consequat tempor."
  },
  {
    "what": "mollit",
    "who": "Kim Humphrey",
    "when": "3:08PM",
    "notes": "Eiusmod qui quis aliqua qui proident incididunt voluptate voluptate veniam anim officia ea fugiat in."
  },
  {
    "what": "veniam",
    "who": "Mona Sloan",
    "when": "3:08PM",
    "notes": "Eiusmod tempor nisi exercitation pariatur anim consectetur sunt tempor ut aliquip ad."
  },
  {
    "what": "Lorem",
    "who": "Davis Morton",
    "when": "3:08PM",
    "notes": "Fugiat do aliquip laboris nisi sint consequat esse laboris ipsum esse excepteur ad cupidatat."
  },
  {
    "what": "adipisicing",
    "who": "Shana Curtis",
    "when": "3:08PM",
    "notes": "Irure non amet laborum officia sit enim proident fugiat amet dolor qui nisi reprehenderit aliqua."
  },
  {
    "what": "quis",
    "who": "Helga West",
    "when": "3:08PM",
    "notes": "Aliquip anim adipisicing exercitation fugiat sit officia ex elit."
  },
  {
    "what": "culpa",
    "who": "Nelda Banks",
    "when": "3:08PM",
    "notes": "Velit dolore ex aliquip incididunt reprehenderit nostrud nisi dolor dolor excepteur."
  },
  {
    "what": "ea",
    "who": "Kirsten Wooten",
    "when": "3:08PM",
    "notes": "Sint commodo mollit reprehenderit ullamco cillum laboris."
  },
  {
    "what": "et",
    "who": "Chrystal Knapp",
    "when": "3:08PM",
    "notes": "Adipisicing aute anim aliqua velit ut aliquip id duis non non nostrud."
  },
  {
    "what": "velit",
    "who": "Nieves Hess",
    "when": "3:08PM",
    "notes": "Aliquip amet sunt irure veniam do quis velit sit sunt irure amet ea."
  },
  {
    "what": "veniam",
    "who": "Mercado Hopper",
    "when": "3:08PM",
    "notes": "Reprehenderit deserunt Lorem esse excepteur ipsum excepteur pariatur anim."
  }
];
  
});