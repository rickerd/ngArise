'use strict';
var OBJECTERROR = 'The options should be an object';

angular.module('ngArise', ['ngAriseTemplates'])
    .provider('arise', [function () {
        this.options = {
            title: 'Please wait',
            message: 'We\'re loading data',
            templateUrl: 'views/default.html'
        };

        this.debug = false;

        this.setOptions = function (options) {
            if (!angular.isObject(options)) {
                throw new Error(OBJECTERROR);
            }
            this.options = angular.extend({}, this.options, options);
        };

        this.setDebug = function (boolean) {
            if (!angular.isUndefined(boolean)) {
                this.debug = boolean;
            }
        };

        this.$get = ['$http', '$templateCache', function ($http, $templateCache) {
            var options = this.options;
            $http.get(options.templateUrl, {cache: $templateCache})
                .then(function () {

                }, function () {
                    throw new Error('Template (' + options.templateUrl + ') could not be loaded.');
                });

            return this;
        }];
    }])
    .directive('ngArise', ['$templateCache', 'arise', function ($templateCache, arise) {
        return {
            restrict: 'EA',
            scope: {},
            link: function (scope, attr) {
                var requestForOpen = 0;

                var debugMessage = function (message) {
                    if (true === arise.debug) {
                        console.log(message);
                    }
                };

                scope.$on('arise-loading', function (event, data) {

                    debugMessage(' ');
                    debugMessage('Start - RequestOpen: ' + requestForOpen);

                    if (0 === requestForOpen) {
                        debugMessage('loading.' + data.open);
                        scope.loading = data.open;
                    }

                    if (true === data.open) {
                        requestForOpen = (requestForOpen + 1);
                        debugMessage('Adding 1');
                    }

                    if (false === data.open) {
                        if (requestForOpen > 0) {
                            requestForOpen = (requestForOpen - 1);
                            debugMessage('Removing 1');
                        }
                    }

                    if (0 === requestForOpen && false === data.open) {
                        debugMessage('Resetting completely');
                        scope.loading = false;
                        scope.title = arise.options.title;
                        scope.message = arise.options.message;
                    }

                    debugMessage('End - RequestOpen: ' + requestForOpen);
                    debugMessage(' ');
                });

                scope.$on('arise-change', function (event, data) {

                    if (!angular.isUndefined(data.title)) {
                        scope.title = data.title;
                    }
                    if (!angular.isUndefined(data.message)) {
                        scope.message = data.message;
                    }
                });

                scope.$on('arise-destroy', function () {
                    requestForOpen = 0;
                    scope.loading = false;
                });

                scope.title = angular.isUndefined(attr.title) ? arise.options.title : attr.title;
                scope.message = angular.isUndefined(attr.message) ? arise.options.message : attr.message;
            },
            template: '<div data-ng-if="loading">' + $templateCache.get(arise.options.templateUrl) + '</div>'
        };
    }])
    .factory('Arise', ['$rootScope', '$timeout', 'arise', function ($rootScope, $timeout, arise) {
        return {
            show: function (options) {
                if (angular.isUndefined(options)) {
                    options = {};
                }

                $timeout(function () {
                    $rootScope.$broadcast('arise-loading', angular.extend({}, options, {open: true}));
                }, 1);
            },
            hide: function () {
                $timeout(function () {
                    $rootScope.$broadcast('arise-loading', {
                        open: false,
                        title: arise.options.title,
                        message: arise.options.message
                    });
                }, 1);
            },
            change: function (options) {
                if (!angular.isObject(options)) {
                    throw new Error(OBJECTERROR);
                }

                $rootScope.$broadcast('arise-change', {
                    title: options.title,
                    message: options.message
                });
            },
            destroy: function () {
                $rootScope.$broadcast('arise-destroy');
            }
        };
    }]);
