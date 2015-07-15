/// <reference path="../AppDefinitions.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'system/AbstractView'], function (require, exports, AbstractView) {
    var FaceLocationView = (function (_super) {
        __extends(FaceLocationView, _super);
        function FaceLocationView(text) {
            _super.call(this, text);
        }
        FaceLocationView.prototype.start = function () {
            this.insertFace();
            this.getLocation();
        };
        FaceLocationView.prototype.update = function (text) {
        };
        FaceLocationView.prototype.empty = function () {
            try {
                this.camera.stop();
            }
            catch (e) {
            }
        };
        FaceLocationView.prototype.remove = function () {
            _super.prototype.remove.call(this);
            this.empty();
        };
        FaceLocationView.prototype.getLocation = function () {
            navigator.geolocation.getCurrentPosition(this.insertMap.bind(this));
        };
        FaceLocationView.prototype.insertMap = function (position) {
            var $holder = this.$('.map');
            $holder.css({ width: 300, height: 300, top: 200, left: 475 });
            var holder = $holder[0];
            var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 8
            };
            var map = new google.maps.Map(holder, mapOptions);
            setTimeout(function () {
                map.setZoom(14);
            }, 2500);
        };
        FaceLocationView.prototype.insertFace = function () {
            this.$('.camera').css({ width: 0, height: 0, left: '120px', top: '120px', position: 'absolute' });
            window.navigator.getMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia);
            window.navigator.getMedia({ video: true, audio: false }, this.appendVideo.bind(this), 
            //handle error
            function (error) {
                console.log(error);
            });
        };
        FaceLocationView.prototype.appendVideo = function (mediaStream) {
            var video = document.createElement('video');
            this.camera = mediaStream;
            video.src = window.URL.createObjectURL(mediaStream);
            $(video).css({ width: '100%', height: '100%' });
            video.play();
            this.$('.camera').append(video);
            this.$('.camera').animate({
                width: '300px',
                height: '300px'
            }, 750);
        };
        return FaceLocationView;
    })(AbstractView);
    return FaceLocationView;
});
