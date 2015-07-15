/// <reference path="../AppDefinitions.d.ts"/>
define(["require", "exports", 'Terminal/TerminalPresenter', 'Terminal/TerminalView', 'Terminal/Terminal.html', 'Terminal/TerminalOutput', 'system/Loader'], function (require, exports, TerminalPresenter, TerminalView, TerminalHtml, TerminalOutput, Loader) {
    var TerminalFactory = (function () {
        function TerminalFactory() {
        }
        TerminalFactory.create = function () {
            if (typeof TerminalFactory.instance === 'undefined') {
                TerminalFactory.instance = new TerminalFactory();
            }
            return TerminalFactory.instance;
        };
        TerminalFactory.prototype.createTerminalView = function () {
            var template = TerminalHtml.get();
            return new TerminalView(template);
        };
        TerminalFactory.prototype.createTerminalPresenter = function () {
            var terminalOutput = new TerminalOutput();
            var terminalPresenter = new TerminalPresenter(terminalOutput);
            var loader = new Loader();
            loader.addListener('load', function (data) {
                terminalOutput.setText(data);
                terminalPresenter.start();
            });
            loader.load('static/terminal.txt');
            return terminalPresenter;
        };
        return TerminalFactory;
    })();
    return TerminalFactory;
});
