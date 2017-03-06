/* jshint node: true */
'use strict';

describe('My Directive', function () {
    var compile, scope, provider, Arise, $timeout, foo;

    function getCompiledElement() {
        var element = angular.element('<ng-arise></ng-arise>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    beforeEach(module('ngArise', function (ariseProvider) {
        provider = ariseProvider;
    }));

    beforeEach(function () {

        inject(function ($compile, $rootScope, _Arise_, _$timeout_) {
            compile = $compile;
            scope = $rootScope.$new();
            Arise = _Arise_;
            $timeout = _$timeout_;

            spyOn($rootScope, '$broadcast');
            foo = getCompiledElement();
        });
    });

    it('Should throw an error for not settin the options object', function () {
        expect(function () {
            provider.setOptions();
        }).toThrowError('The options should be an object');

    });

    it('Should set the provider options', function () {
        provider.setOptions({
            title: 'Foo',
            message: 'Bar'
        });

        expect(provider.options).toEqual({
            title: 'Foo',
            message: 'Bar',
            templateUrl: 'views/default.html'
        });

    });

    it('Should show the loader and broadcast the show', function () {

        scope.$broadcast('arise-loading', angular.extend({}, {}, {open: true}));
        expect(scope.$broadcast).toHaveBeenCalledWith('arise-loading', angular.extend({}, {}, {open: true}));
    });

    it('Should show the loader and broadcast the close', function () {
        $timeout(function () {
            Arise.show();
        }, 1);

        scope.$digest();

        $timeout.flush(1);
        scope.$broadcast('arise-loading', angular.extend({}, {}, {open: true}));

        $timeout(function () {
            Arise.hide();
            scope.$broadcast('arise-loading', angular.extend({}, {}, {open: false}));
        }, 1);
        
        $timeout.flush(1);

        scope.$digest();


        expect(scope.$broadcast).toHaveBeenCalledWith('arise-loading', angular.extend({}, {}, {open: false}));
    });

    it('Should set the debug to true', function () {
        provider.setDebug(true);

        Arise.show();
        expect(provider.debug).toEqual(true);

    });

    it('should broadcast a change', function () {
        Arise.change({title: 'foo', message: 'bar'});
        expect(scope.$broadcast).toHaveBeenCalledWith('arise-change', {title: 'foo', message: 'bar'});
    });

    it('should fail at changing message', function () {
        expect(function () {
            Arise.change();
        }).toThrowError('The options should be an object');
    });

});
