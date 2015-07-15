/// <reference path="../system/Presenter.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var FaceLocationPresenter = (function () {
        function FaceLocationPresenter() {
        }
        FaceLocationPresenter.prototype.attachView = function (view) {
            this.view = view;
        };
        FaceLocationPresenter.prototype.update = function () {
        };
        return FaceLocationPresenter;
    })();
    return FaceLocationPresenter;
});
