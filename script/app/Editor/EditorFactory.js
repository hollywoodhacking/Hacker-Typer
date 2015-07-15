/// <reference path="../AppDefinitions.d.ts"/>
define(["require", "exports", 'Editor/EditorPresenter', 'Editor/EditorView', 'Editor/Editor.html', 'Editor/Typer'], function (require, exports, EditorPresenter, EditorView, EditorHtml, Typer) {
    var EditorFactory = (function () {
        function EditorFactory() {
        }
        EditorFactory.create = function () {
            if (typeof EditorFactory.instance === 'undefined') {
                EditorFactory.instance = new EditorFactory();
            }
            return EditorFactory.instance;
        };
        EditorFactory.prototype.createEditorView = function (type) {
            var template = EditorHtml.get();
            return new EditorView(template, type);
        };
        EditorFactory.prototype.createEditorPresenter = function () {
            var typer = new Typer();
            return new EditorPresenter(typer);
        };
        return EditorFactory;
    })();
    return EditorFactory;
});
