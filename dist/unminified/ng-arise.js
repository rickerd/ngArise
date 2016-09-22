/*!
 * arise v0.0.5
 * https://rickerd.github.io/ngArise/
 *
 * Copyright (c) 2016 Rick de Graaff
 * License: MIT
 *
 * Generated at Thursday, September 22nd, 2016, 10:48:56 AM
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

                    if (!angular.isUndefined(data.title)) {
                        scope.title = data.title;
                    }
                    if (!angular.isUndefined(data.message)) {
                        scope.message = data.message;
                    }
                });

                scope.title = angular.isUndefined(attr.title) ? arise.options.title : attr.title;
                scope.message = angular.isUndefined(attr.message) ? arise.options.message : attr.message;
            },
            template: '<div data-ng-if="loading">' + $templateCache.get(arise.options.templateUrl) + '</div>'
        };
    }])
    .factory('Arise', ['$rootScope', '$timeout', 'arise', function ($rootScope, $timeout, arise) {
        return {
            show: function (obj) {
                if (angular.isUndefined(obj)) {
                    obj = {};
                }

                $timeout(function () {
                    $rootScope.$broadcast('arise-loading', angular.extend({}, obj, {open: true}));
                }, 1);
            },
            hide: function () {
                $rootScope.$broadcast('arise-loading', {
                    open: false,
                    title: arise.options.title,
                    message: arise.options.message
                });
            }
        };
    }]);


angular.module("ngAriseTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/default.html","<div id=\"arise-overlay\"></div>\n<div id=\"arise\" class=\"animated fadeInUp ng-cloak\">\n    <div class=\"arise-content\">\n        <h2 class=\"title\">{{title}}</h2>\n        <p>{{message}}</p>\n    </div>\n    <div class=\"arise-dots\">\n        <div class=\"arise-dot\"></div>\n        <div class=\"arise-dot\"></div>\n        <div class=\"arise-dot\"></div>\n    </div>\n</div>");}]);
}());