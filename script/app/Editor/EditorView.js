/// <reference path="../AppDefinitions.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'system/AbstractView'], function (require, exports, AbstractView) {
    var EditorView = (function (_super) {
        __extends(EditorView, _super);
        function EditorView(text, type) {
            _super.call(this, text);
            this.events = {
                'click': 'clickHandle'
            };
            this.type = type;
        }
        EditorView.prototype.render = function () {
            var el = _super.prototype.render.call(this);
            this.codeMirror = CodeMirror(this.$('.viewport')[0], { mode: this.type, lineNumbers: true });
            this.codeMirror.focus();
            return el;
        };
        EditorView.prototype.update = function (text) {
            this.codeMirror.setValue(text);
            this.codeMirror.setCursor({ line: text.length, ch: text.length });
            this.updateStatusBar();
        };
        EditorView.prototype.updateStatusBar = function () {
            var cursor = this.codeMirror.getCursor();
            this.$('.statusbar').html('Line ' + (cursor.line + 1) + ', Column ' + cursor.ch);
        };
        EditorView.prototype.clickHandle = function () {
            alert('yo!');
        };
        return EditorView;
    })(AbstractView);
    return EditorView;
});
