/// <reference path="AppDefinitions.d.ts"/>
/// <reference path="system/ContainerView.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'system/AbstractView'], function (require, exports, AbstractView) {
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView(selector) {
            _super.call(this, selector);
            this.$('#splash .close').click(this.toggleSplash);
            //    if(document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement){
            //      this.hideFullscreenPrompt();
            //    }
            this.$('#fullscreen_prompt .dismiss').click(this.hideFullscreenPrompt);
            document.addEventListener("fullscreenchange", this.hideFullscreenPrompt, false);
            document.addEventListener("fullscreen", this.hideFullscreenPrompt, false);
            document.addEventListener("mozfullscreenchange", this.hideFullscreenPrompt, false);
            window.addEventListener("webkitfullscreenchange", this.hideFullscreenPrompt, false);
            document.addEventListener("msfullscreenchange", this.hideFullscreenPrompt, false);
        }
        AppView.prototype.attachMainView = function (view) {
            var el = view.render();
            if (typeof this.mainView !== 'undefined') {
                this.mainView.remove();
            }
            this.mainView = view;
            this.$('#stage').append(el);
        };
        AppView.prototype.toggleSplash = function () {
            $('#splashHolder').toggle();
        };
        AppView.prototype.hideFullscreenPrompt = function () {
            $('#fullscreen_prompt').hide();
        };
        return AppView;
    })(AbstractView);
    return AppView;
});
