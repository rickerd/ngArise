'use strict';

angular.module('appExample', ['ngArise'])
    .config(['ariseProvider', function (ariseProvider) {
        ariseProvider.setOptions({message: 'counting down'});
        ariseProvider.setDebug(true);
    }])

    .controller('appController', ['$interval', '$timeout', 'Arise', function ($interval, $timeout, Arise) {
        var self = this;

        var showArise = function () {
            Arise.show();

            $timeout(function () {
                Arise.change({
                    title: '!! Hold on !!',
                    message: 'Still counting down'
                });
            }, 1500);

            $timeout(function () {
                Arise.change({
                    title: 'Debug messages?',
                    message: 'Open the console for debug messages'
                });
            }, 3500);
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

