/// <reference path="../jasmine.d.ts" />
define(["require", "exports", 'system/AbstractEventType'], function (require, exports, AbstractEventType) {
    describe('EventType abstract : ', function () {
        describe('add events : ', function () {
            var eventType;
            beforeEach(function () {
                eventType = new AbstractEventType();
            });
            it('should allow a client to listen to arbitrary events', function () {
                expect(function () {
                    eventType.addListener('event', function () {
                    }, eventType);
                }).not.toThrow();
            });
            it('should call the listener when an event is triggered', function () {
                var triggered = false;
                eventType.addListener('ev', function () {
                    triggered = true;
                }, eventType);
                eventType.trigger('ev');
                expect(triggered).toBe(true);
            });
            it('should not call the listener when it has been removed', function () {
                var triggered = false;
                var triggeredTrue = function () {
                    triggered = true;
                };
                eventType.addListener('ev', triggeredTrue, eventType);
                eventType.removeListener('ev', triggeredTrue);
                eventType.trigger('ev');
                expect(triggered).toBe(false);
            });
            it('should allow arguments to be passed over events', function () {
                var eventData = 'foo';
                var outputData = '';
                eventType.addListener('ev', function (data) {
                    outputData = data;
                }, eventType);
                eventType.trigger('ev', eventData);
                expect(outputData).toBe(eventData);
            });
            it('should not fire any listeners when removeAllListeners has been called', function () {
                var triggered = false;
                var triggeredTrue = function () {
                    triggered = true;
                };
                eventType.addListener('ev', triggeredTrue, eventType);
                eventType.addListener('ev', triggeredTrue, eventType);
                eventType.removeAllListeners();
                eventType.trigger('ev');
                expect(triggered).toBe(false);
            });
        });
    });
});
