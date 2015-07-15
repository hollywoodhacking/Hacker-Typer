/// <reference path="../AppDefinitions.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'system/AbstractView'], function (require, exports, AbstractView) {
    var TerminalView = (function (_super) {
        __extends(TerminalView, _super);
        function TerminalView(text) {
            _super.call(this, text);
            this.CURSOR_HIDE_TIME = 1150;
            this.CURSOR_SHOW_TIME = 600;
            this.cursorFlash = false;
        }
        TerminalView.prototype.startInput = function () {
            this.update(this.getPrompt());
            this.startCursor();
        };
        TerminalView.prototype.getPrompt = function () {
            var prompt = '<span class="bracket">[</span>';
            prompt += this.getTime();
            prompt += '<span class="bracket">]</span>';
            prompt += '<span class="name">zerocool</span><span class="at">@</span>';
            prompt += '<span class="host">localhost</span>';
            prompt += ' <span class="chevron">></span> ';
            return prompt;
        };
        TerminalView.prototype.getTime = function () {
            var date = new Date();
            var hours = date.getHours();
            var mins = date.getMinutes();
            return hours + ':' + mins;
        };
        TerminalView.prototype.startCursor = function () {
            this.cursorFlash = true;
            this.addCursor();
        };
        TerminalView.prototype.addCursor = function () {
            var _this = this;
            clearTimeout(this.timeout);
            this.update(this.getCursor());
            if (this.cursorFlash) {
                this.timeout = setTimeout(function () {
                    _this.removeCursor();
                }, this.CURSOR_SHOW_TIME);
            }
        };
        TerminalView.prototype.removeCursor = function () {
            var _this = this;
            clearTimeout(this.timeout);
            this.$('.cursor').remove();
            if (this.cursorFlash) {
                this.timeout = setTimeout(function () {
                    _this.addCursor();
                }, this.CURSOR_HIDE_TIME);
            }
        };
        TerminalView.prototype.getCursor = function () {
            return '<span class="cursor"> </span>';
        };
        TerminalView.prototype.stopInput = function () {
            this.cursorFlash = false;
            this.removeCursor();
        };
        TerminalView.prototype.update = function (text) {
            this.removeCursor();
            this.$('.j-terminal-input')[0].innerHTML += text;
        };
        TerminalView.prototype.empty = function () {
            this.$('.j-terminal-input').empty();
        };
        return TerminalView;
    })(AbstractView);
    return TerminalView;
});
