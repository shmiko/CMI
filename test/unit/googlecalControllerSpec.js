'use strict';

describe('CalendarCtrl', function(){

  var scope, ctrl, $httpBackend;

  beforeEach(module('googleCalApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(function(string) {
            return (string.indexOf('https://www.googleapis.com/calendar/v3/calendars/') == 0)
        }).
        respond( {
            "summary": "SW Notts District Diary",
            "description": "Calendar of meetings and events relevant to Scout Leaders in SW Notts Scout District",
            "items": [ { "title": "Mock 1" }, { "title": "Mock 2" }, { "title": "Mock 3" } ]
        } );

    scope = $rootScope.$new();
    ctrl = $controller('CalendarCtrl', {$scope: scope});
  }));

  it('should create "events" model with 3 events, assign title and description and show up to 10 items', function() {
    expect(scope.events).toBeUndefined();
    $httpBackend.flush();

    expect(scope.events).toEqual([ { "title": "Mock 1" }, { "title": "Mock 2" }, { "title": "Mock 3" } ]);
    expect(scope.title).toEqual("SW Notts District Diary");
    expect(scope.description).toEqual("Calendar of meetings and events relevant to Scout Leaders in SW Notts Scout District");
    expect(scope.calItems).toEqual(10);
  });

  it('expects correct getEndDate() with dateTime', inject(function($controller) {
    var scope = {},
        ctrl = $controller('CalendarCtrl', {$scope:scope});

    var event = { end: { dateTime: '2010-02-09T22:00:00Z' } };

    expect(scope.getEndDate(event)).toEqual('Tue Feb 09 2010');
  }));

  it('expects correct getEndDate() with date', inject(function($controller) {
    var scope = {},
        ctrl = $controller('CalendarCtrl', {$scope:scope});

    var event = { end: { date: '2010-02-09T22:00:00Z' } };

    expect(scope.getEndDate(event)).toEqual('Tue Feb 09 2010');
  }));

  it('expects showMoreItems() to increase scope.calItems by scope.calItems', inject(function($controller) {
    var scope = {
            calItems: 10,
            calConfig: {
                calPerPage: 10
            }
        },
        ctrl = $controller('CalendarCtrl', {$scope:scope});

        scope.showMoreItems();

    expect(scope.calItems).toEqual(20);
  }));

});
