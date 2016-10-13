/*!
 * arise v0.0.9
 * https://rickerd.github.io/ngArise/
 *
 * Copyright (c) 2016 Rick de Graaff
 * License: MIT
 *
 * Generated at Thursday, October 13th, 2016, 12:02:46 PM
 */
(function() {
'use strict';

var arise = angular.module('ngArise', ['ngAriseTemplates']);


arise
    .provider('arise', function () {
        this.options = {
            title: 'Please wait',
            message: 'We\'re loading data',
            templateUrl: 'views/default.html'
        };

        this.debug = false;

        this.setOptions = function (options) {
            if (!angular.isObject(options)) {
                throw new Error('The options should be an object');
            }
            this.options = angular.extend({}, this.options, options);
        };

        this.setDebug = function (boolean) {
            if (!angular.isUndefined(boolean)) {
                this.debug = boolean;
            }
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
                    throw new Error('The options should be an object');
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


angular.module("ngAriseTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/default.html","<div id=\"arise-overlay\"></div>\n<div id=\"arise\" class=\"animated fadeInUp ng-cloak\">\n    <div class=\"arise-content\">\n        <h2 class=\"title\">{{title}}</h2>\n        <p>{{message}}</p>\n    </div>\n    <div class=\"arise-dots\">\n        <div class=\"arise-dot\"></div>\n        <div class=\"arise-dot\"></div>\n        <div class=\"arise-dot\"></div>\n    </div>\n</div>");}]);
}());