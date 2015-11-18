'use strict';

describe('getCalUrl', function(){

    var timerCallback;

    beforeEach(function() {
      timerCallback = jasmine.createSpy("timerCallback");
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

  it('expects getCalUrl to return correct URL', inject(function() {
    var baseTime = new Date(2015, 10, 7);
    var config = { 'apiKeys': { 'calendar': 'key' } };
    jasmine.clock().mockDate(baseTime);

    var result = getCalUrl('test', config);

    expect(result).toEqual('https://www.googleapis.com/calendar/v3/calendars/test/events?orderBy=startTime&maxResults=10000&singleEvents=true&timeMin=' + baseTime.toISOString() + '&key=key');
  }));

});
