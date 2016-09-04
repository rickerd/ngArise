/*!
 * arise v0.0.1
 * https://github.com/rickerd/ngarise
 *
 * Copyright (c) 2016 Rick de Graaff
 * License: MIT
 *
 * Generated at Sunday, September 4th, 2016, 3:22:46 PM
 */
(function() {
'use strict';

var arise = angular.module('ngArise', []);


arise
    .directive('ngArise', function () {
        return {
            restrict: 'E',
            scope: {},
            link: function (scope) {
                scope.$on('arise-loading', function (event, data) {
                    scope.loading = data.open;
                });
            },
            template: '<div data-ng-if="loading"><div id="overlay"></div>' +
            '<div id="loading">' +
            '<div><h2 class="title">{{title || \'Aan het laden\'}}</h2> <p>{{message}}</p></div></div></div>'
        };
    })
    .factory('Arise', ['$rootScope', function ($rootScope) {
        return {
            show: function () {
                $rootScope.$broadcast('arise-loading', {open: true});
            },
            hide: function () {
                $rootScope.$broadcast('arise-loading', {open: false});
            }
        };
    }]);
}());