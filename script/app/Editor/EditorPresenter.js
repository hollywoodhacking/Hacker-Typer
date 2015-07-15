/// <reference path="../AppDefinitions.d.ts"/>
/// <reference path="../system/Presenter.d.ts"/>
/// <reference path="../system/View.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var EditorPresenter = (function () {
        function EditorPresenter(typer) {
            this.typer = typer;
        }
        EditorPresenter.prototype.setText = function (text) {
            this.typer.setText(text);
        };
        EditorPresenter.prototype.update = function (key) {
            switch (key) {
                case 8:
                    this.typer.backspace();
                    break;
                case 9:
                    this.typer.typeFullWord();
                    break;
                case 13:
                    this.typer.typeFullLine();
                case 16:
                case 17:
                case 18:
                    break;
                default:
                    this.typer.typeSingleLetter();
                    break;
            }
            this.updateView();
        };
        EditorPresenter.prototype.attachView = function (view) {
            this.editorView = view;
        };
        EditorPresenter.prototype.updateView = function () {
            var text = this.typer.getText();
            this.editorView.update(text);
        };
        return EditorPresenter;
    })();
    return EditorPresenter;
});
