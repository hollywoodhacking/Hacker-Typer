/// <reference path="../AppDefinitions.d.ts"/>
/// <reference path="../system/View.d.ts"/>
/// <reference path="../system/Builder.d.ts"/>
define(["require", "exports", 'Editor/EditorFactory', '../system/Loader', 'system/Utils/ArrayHelpers'], function (require, exports, EditorFactory, Loader, ArrayHelpers) {
    var EditorBuilder = (function () {
        function EditorBuilder() {
            this.editorFactory = EditorFactory.create();
        }
        EditorBuilder.create = function () {
            if (typeof EditorBuilder.instance === 'undefined') {
                EditorBuilder.instance = new EditorBuilder();
            }
            return EditorBuilder.instance;
        };
        EditorBuilder.prototype.build = function () {
            var editor = this.getRandomEditor();
            var editorView = this.editorFactory.createEditorView(editor.type);
            this.editorPresenter = this.editorFactory.createEditorPresenter();
            this.editorPresenter.attachView(editorView);
            this.loadEditor(editor.path);
            return {
                presenter: this.editorPresenter,
                view: editorView
            };
        };
        EditorBuilder.prototype.getRandomEditor = function () {
            var sourceList = [
                { path: 'static/js.txt', type: 'javascript' },
                { path: 'static/kernel.txt', type: 'text/x-csrc' },
                { path: 'static/eve.py.txt', type: 'text/x-python' },
                { path: 'static/Optimizer.hs.txt', type: 'text/x-haskell' },
                { path: 'script/app/App.ts', type: 'text/x-csharp' },
                { path: 'static/java.txt', type: 'text/x-java' },
                { path: 'static/bb.sh.txt', type: 'text/x-sh' }
            ];
            var item = ArrayHelpers.getRandomItem(sourceList);
            return item;
        };
        EditorBuilder.prototype.loadEditor = function (path) {
            var _this = this;
            var editorLoader = new Loader();
            editorLoader.addListener('load', function (data) {
                _this.editorPresenter.setText(data);
            });
            editorLoader.load(path);
        };
        return EditorBuilder;
    })();
    return EditorBuilder;
});
