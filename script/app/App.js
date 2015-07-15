/// <reference path="AppDefinitions.d.ts"/>
/// <reference path="system/Builder.d.ts"/>
/// <reference path="system/Presenter.d.ts"/>
/// <reference path="system/ContainerView.d.ts"/>
define(["require", "exports", 'Editor/EditorBuilder', 'Terminal/TerminalBuilder'], function (require, exports, EditorBuilder, TerminalBuilder) {
    // import FaceLocationView = require('FaceLocation/FaceLocationView');
    // import FaceLocationPresenter = require('FaceLocation/FaceLocationPresenter');
    var App = (function () {
        function App() {
            this.mode = 'editor';
            this.builder = EditorBuilder.create();
        }
        App.prototype.init = function (applicationView) {
            this.applicationView = applicationView;
            this.loadEditor();
        };
        App.prototype.keydown = function (key) {
            switch (key) {
                case 116:
                    this.loadEditor();
                    break;
                case 117:
                    this.toggleMode();
                    break;
                case 27:
                    this.applicationView.toggleSplash();
                    break;
                default:
                    this.presenter.update(key);
                    $('.cta').hide();
                    break;
            }
        };
        App.prototype.loadEditor = function () {
            var presenterViewPair = this.builder.build();
            this.presenter = presenterViewPair.presenter;
            this.applicationView.attachMainView(presenterViewPair.view);
            // kick off application with a backspace
            this.presenter.update(8);
        };
        App.prototype.toggleMode = function () {
            if (this.mode === 'editor') {
                this.mode = 'terminal';
                this.builder = TerminalBuilder.create();
            }
            else {
                this.mode = 'editor';
                this.builder = EditorBuilder.create();
            }
            this.loadEditor();
        };
        App.prototype.displayFaceLocationMode = function () {
            // var faceLocationView:FaceLocationView = new FaceLocationView('<div><div class="map"></div><div class="camera"></div></div>');
            // this.presenter = new FaceLocationPresenter();
            // this.presenter.attachView(faceLocationView);
            // this.applicationView.attachMainView(faceLocationView);
            // faceLocationView.start();
        };
        return App;
    })();
    return App;
});
