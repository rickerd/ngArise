## ngArise
[![Build Status](https://travis-ci.org/rickerd/ngArise.svg?branch=master)](https://travis-ci.org/rickerd/ngArise)
[![GitHub release](https://img.shields.io/github/release/rickerd/ngarise.svg)](https://github.com/rickerd/ngArise)

## Demo
Visit the [Github page](https://rickerd.github.io/ngArise) for a demo

## Installing

#### Download directly
[Download ngArise](https://github.com/rickerd/ngarise/archive/master.zip) files from GitHub

#### Bower
```bash
bower install ngArise --save
```

## How to Use

Add the dependency ngArise
```javascript
angular.module('app', ['ngArise']);
```

Add provider to make configurations (optional)
```javascript
.config(['ariseProvider', function (ariseProvider) {
    ariseProvider.setOptions(
        {
            title: 'Custom title'
            message: 'Here a message',
            templateUrl: 'path/to/views/message.html'
        }
    );
}]);
```

Inject Arise service to show / hide
```javascript
.controller(['Arise', function(Arise) {
    Arise.show();
    // and / or
    Arise.hide();
}]);
```

Place directive in html
``` html
<ng-arise></ng-arise>
```

## Provider API

Options can be passed to configuration provider globally

The options list:

|       Option      |                 Type                |         Default value          |                   Description                           |
| ----------------- | ----------------------------------- | ------------------------------ | ------------------------------------------------------- |
| title             | String                              | "Please wait"                  | Message that is shown as H2 in default template         |
| message           | String                              | "We're loading data"           | String that is shown as a paragraph in default template |
| templateUrl       | String                              | "views/default.html"           | Specify which template should be loaded                 |
