'use strict';

angular.module('appExample', ['ngArise'])

    .controller('appController', ['$timeout', '$interval', 'Arise', function ($timeout, $interval, Arise) {
        var self = this,
            i = 5;
        this.appName = 'ngArise Example';
        this.timeToDisappear = 5;
        $interval(function () {
            self.timeToDisappear = self.timeToDisappear-1;
        }, 1000, 5);

        $timeout(function () {
            Arise.show();
        }, 200);

        $timeout(function () {
            Arise.hide();
            self.textToDisappear = undefined;
        }, 5200);
    }]);