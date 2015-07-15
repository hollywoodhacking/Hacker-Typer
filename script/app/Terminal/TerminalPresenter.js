/// <reference path="../AppDefinitions.d.ts"/>
/// <reference path="../system/Presenter.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var TerminalPresenter = (function () {
        function TerminalPresenter(terminalOutput) {
            this.MAX_DELAY = 1000;
            this.mode = 'lines';
            this.terminalOutput = terminalOutput;
        }
        TerminalPresenter.prototype.start = function () {
            this.view.empty();
            this.autoUpdate();
        };
        TerminalPresenter.prototype.autoUpdate = function () {
            var _this = this;
            var output = this.terminalOutput.getText();
            clearTimeout(this.timeout);
            if (output === '%STOP') {
                this.mode = 'input';
                this.view.startInput();
            }
            else if (output === '%START') {
                this.mode = 'lines';
                this.view.stopInput();
            }
            else {
                this.view.update(output);
            }
            if (this.mode === 'lines') {
                this.timeout = setTimeout(function () {
                    _this.autoUpdate();
                }, this.getRandomDelay());
            }
        };
        TerminalPresenter.prototype.getRandomDelay = function () {
            return Math.floor(Math.random() * this.MAX_DELAY);
        };
        TerminalPresenter.prototype.attachView = function (view) {
            this.view = view;
        };
        TerminalPresenter.prototype.update = function (key) {
            this.autoUpdate();
        };
        return TerminalPresenter;
    })();
    return TerminalPresenter;
});
