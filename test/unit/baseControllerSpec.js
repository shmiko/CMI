describe('BaseCtrl', function(){

  beforeEach(module('googleCalApp'));

  it('expects scope to be defined', inject(function($controller) {
    var scope = {},
        ctrl = $controller('BaseCtrl', {$scope:scope});

    expect(scope).toBeDefined();
  }));

  it('should create date and dateTime in scope', inject(function($controller) {
    var scope = {},
        ctrl = $controller('BaseCtrl', {$scope:scope});

        var date = new Date();

    expect(scope.date).toBeDefined();
    expect(scope.dateTime).toBeDefined();
  }));

  it('should create calConfig object in scope with more than one property', inject(function($controller) {
    var scope = {},
        ctrl = $controller('BaseCtrl', {$scope:scope});

    expect(Object.keys(scope.calConfig).length).toBeGreaterThan(1);
  }));

});
