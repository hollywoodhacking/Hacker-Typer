/// <reference path="../AppDefinitions.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var AbstractEventType = (function () {
        function AbstractEventType() {
            this.eventHash = {};
        }
        AbstractEventType.prototype.addListener = function (event, listener, context) {
            if (!this.eventStored(event)) {
                this.eventHash[event] = new Array();
            }
            this.eventHash[event].push({ listener: listener, context: context || null });
        };
        AbstractEventType.prototype.removeListener = function (event, listener) {
            if (this.eventStored(event)) {
                _(this.eventHash[event]).forEach(function (record) {
                    if (listener === record.listener) {
                        record.listener = function () {
                        };
                        record.context = null;
                    }
                });
            }
        };
        AbstractEventType.prototype.trigger = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this.eventStored(event)) {
                _(this.eventHash[event]).forEach(function (record) {
                    record.listener.apply(record.context, args);
                });
            }
        };
        AbstractEventType.prototype.removeAllListeners = function () {
            this.eventHash = {};
        };
        AbstractEventType.prototype.eventStored = function (event) {
            return typeof this.eventHash[event] !== 'undefined';
        };
        return AbstractEventType;
    })();
    return AbstractEventType;
});
