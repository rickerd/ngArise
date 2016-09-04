## ngArise
[![Build Status](https://travis-ci.org/rickerd/ngArise.svg?branch=master)](https://travis-ci.org/rickerd/ngArise)
[![GitHub release](https://img.shields.io/github/release/rickerd/ngarise.svg)](https://github.com/rickerd/ngarise)


## Installing

#### Download directly
[Download ngArise](https://github.com/rickerd/ngarise/archive/master.zip) files from GitHub

#### Bower
	bower install ngArise

#### NPM
	npm install ngArise

## How to Use

``` javascript
angular.module('app', ['ngArise'])
.controller(function(Arise) {
    Arise.show();
    // or
    Arise.hide();
});
```
``` html
<ng-arise data-title="{{loader.title}}" data-message="{{loader.message}}"></ng-arise>
```