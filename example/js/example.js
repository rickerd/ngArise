'use strict';

angular.module('appExample', ['ngArise'])

    .controller('appController', ['$timeout', 'Arise', function ($timeout, Arise) {
        var self = this;
        this.appName = 'ngArise Example';

        this.textToDisappear = 'The loader will disappear in 5 seconds';

        $timeout(function () {
            Arise.show();
        }, 200);

        $timeout(function () {
            Arise.hide();
            self.textToDisappear = undefined;
        }, 5200);
    }]);