'use strict';

arise
    .provider('arise', function () {
        this.options = {
            title: 'Please wait',
            message: 'We\'re loading data',
            templateUrl: 'views/default.html'
        };

        this.setOptions = function (options) {
            if (!angular.isObject(options)) {
                throw new Error('The options should be an object');
            }
            this.options = angular.extend({}, this.options, options);
        };

        this.$get = function ($http, $templateCache) {
            var options = this.options;
            $http.get(options.templateUrl, {cache: $templateCache})
                .error(function () {
                    throw new Error('Template (' + options.templateUrl + ') could not be loaded.');
                });

            return this;
        };
    })
    .directive('ngArise', ['$templateCache', 'arise', function ($templateCache, arise) {
        return {
            restrict: 'EA',
            scope: {},
            link: function (scope, attr) {
                scope.$on('arise-loading', function (event, data) {
                    scope.loading = data.open;
                });
                scope.title = angular.isUndefined(attr.title) ? arise.options.title : attr.title;
                scope.message = angular.isUndefined(attr.message) ? arise.options.message : attr.message;
            },
            template: '<div data-ng-if="loading">' + $templateCache.get(arise.options.templateUrl) + '</div>'
        };
    }])
    .factory('Arise', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return {
            show: function () {
                $timeout(function () {
                    $rootScope.$broadcast('arise-loading', {open: true});
                }, 1);
            },
            hide: function () {
                $rootScope.$broadcast('arise-loading', {open: false});
            }
        };
    }]);
