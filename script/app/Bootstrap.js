/// <reference path="AppDefinitions.d.ts"/>
define(["require", "exports", 'AppView', 'App'], function (require, exports, AppView, App) {
    var Bootstrap = (function () {
        function Bootstrap() {
            this.initApplication();
        }
        Bootstrap.prototype.initApplication = function () {
            var _this = this;
            var appView = new AppView('body');
            var app = new App();
            app.init(appView);
            // set up keyboard events
            $(document).keydown(function (event) {
                app.keydown(event.which);
                if (event.which !== 122) {
                    return _this.preventDefaults(event);
                }
                else {
                    return true;
                }
            });
        };
        Bootstrap.prototype.preventDefaults = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        };
        return Bootstrap;
    })();
    return Bootstrap;
});
