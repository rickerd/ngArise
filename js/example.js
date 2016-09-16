'use strict';

angular.module('appExample', ['ngArise'])
    .config(['ariseProvider', function (ariseProvider) {
        ariseProvider.setOptions({message: 'counting down'});
    }])

    .controller('appController', ['$interval', '$timeout', 'Arise', function ($interval, $timeout, Arise) {
        var self = this;

        var showArise = function () {
            $timeout(function () {
                Arise.show();
            }, 200);
        };

        var hideArise = function () {
            $timeout(function () {
                Arise.hide();
                self.buttonEnabled = true;
            }, 5200);
        };

        var startInterval = function () {
            $interval(function () {
                self.timeToDisappear = self.timeToDisappear - 1;
            }, 1000, 5);
        };

        this.appName = 'ngArise Example';
        this.timeToDisappear = 5;
        this.buttonEnabled = false;

        showArise();
        hideArise();
        startInterval();

        this.reset = function () {
            self.timeToDisappear = 5;
            self.buttonEnabled = false;

            showArise();
            hideArise();
            startInterval();
        };
    }]);