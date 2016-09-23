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
    
    ariseProvider.setDebug(true); // default is false
}]);
```

Inject Arise service to show / hide or destroy
```javascript
.controller(['Arise', function(Arise) {
    Arise.show();
    // and / or
    Arise.hide();
    // and / or
    Arise.destroy();
}]);
```

*Note: Arise.destroy() will remove the complete directive since multiple Arises can occur*

Place directive in html as element or attribute
``` html
<ng-arise></ng-arise>
<!-- or -->
<div ng-arise></div>
```

## Provider API

Options can be passed to configuration provider globally

The options list:

|       Option      |                 Type                |         Default value          |                   Description                           |
| ----------------- | ----------------------------------- | ------------------------------ | ------------------------------------------------------- |
| title             | String                              | "Please wait"                  | Message that is shown as H2 in default template         |
| message           | String                              | "We're loading data"           | String that is shown as a paragraph in default template |
| templateUrl       | String                              | "views/default.html"           | Specify which template should be loaded                 |

## Factory API

Calling the factory Arise to show or hide the loading box an option object can be passed to it.

```javascript
.controller(['Arise', function(Arise) {
    Arise.show({
        title: 'Changed title on the fly',
        message: 'Message can eb changed too'
    });
    // and / or
    Arise.hide();
}]);
```

The functions list:

|       Option      |                 Type                |             Parameter            |
| ----------------- | ----------------------------------- | -------------------------------- |
| show              | function                            | Object | title, message          |
| hide              | function                            |                                  |
| change            | function                            | Object | title, message          |
| destroy           | function                            |                                  |

*Note: Arise.hide() will reset the values to the standard provided provider settings*

The options list:

|       Option      |                 Type                |             Optional           |                   Description                           |
| ----------------- | ----------------------------------- | ------------------------------ | ------------------------------------------------------- |
| title             | String                              | true                           | Message that is shown as H2 in default template         |
| message           | String                              | true                           | String that is shown as a paragraph in default template |
