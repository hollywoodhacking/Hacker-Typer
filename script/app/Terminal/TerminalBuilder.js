/// <reference path="../AppDefinitions.d.ts"/>
/// <reference path="../system/View.d.ts"/>
/// <reference path="../system/Presenter.d.ts"/>
/// <reference path="../system/Builder.d.ts"/>
define(["require", "exports", 'Terminal/TerminalFactory'], function (require, exports, TerminalFactory) {
    var TerminalBuilder = (function () {
        function TerminalBuilder() {
            this.terminalFactory = TerminalFactory.create();
        }
        TerminalBuilder.create = function () {
            if (typeof TerminalBuilder.instance === 'undefined') {
                TerminalBuilder.instance = new TerminalBuilder();
            }
            return TerminalBuilder.instance;
        };
        TerminalBuilder.prototype.build = function () {
            var presenter = this.terminalFactory.createTerminalPresenter();
            var view = this.terminalFactory.createTerminalView();
            presenter.attachView(view);
            return {
                view: view,
                presenter: presenter
            };
        };
        return TerminalBuilder;
    })();
    return TerminalBuilder;
});
