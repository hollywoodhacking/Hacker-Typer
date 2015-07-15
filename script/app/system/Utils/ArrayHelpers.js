/// <reference path="../../AppDefinitions.d.ts"/>
define(["require", "exports"], function (require, exports) {
    var ArrayHelpers = (function () {
        function ArrayHelpers() {
        }
        ArrayHelpers.getRandomItem = function (arr) {
            var randomIndex = Math.round(Math.random() * (arr.length - 1));
            return arr[randomIndex];
        };
        return ArrayHelpers;
    })();
    return ArrayHelpers;
});
