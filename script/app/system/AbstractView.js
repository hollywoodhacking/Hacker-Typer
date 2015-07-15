/// <reference path="../AppDefinitions.d.ts"/>
/// <reference path="View.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var AbstractView = (function () {
        function AbstractView(text) {
            this.$el = $(text);
            this.delegateEvents();
        }
        AbstractView.prototype.render = function () {
            return this.$el;
        };
        AbstractView.prototype.remove = function () {
            this.$el.remove();
        };
        AbstractView.prototype.$ = function (selector) {
            return this.$el.find(selector);
        };
        AbstractView.prototype.update = function (any) {
        };
        AbstractView.prototype.delegateEvents = function () {
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            for (var key in this.events) {
                var method = _(this[this.events[key]]).bind(this);
                if (!method) {
                    continue;
                }
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                if (selector === '') {
                    this.$el.on(eventName, method);
                }
                else {
                    this.$el.on(eventName, selector, method);
                }
            }
        };
        AbstractView.prototype.empty = function () {
            this.$el.empty();
        };
        return AbstractView;
    })();
    return AbstractView;
});
