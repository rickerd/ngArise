'use strict';

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