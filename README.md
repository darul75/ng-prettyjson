ng-prettyjson
=====================

Angular directive for JSON pretty display output, indent and colorized.

Idea was given by... [dddd](https:/stack)

Demo: http://darul75.github.io/ng-prettyjson/

Installation
------------

Using npm:

```
npm install ng-prettyjson
```


How to use it
-------------

You should already have a bunch of scripts and CSS required for Angular

```
<link rel="stylesheet" type="text/css" href="bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="ng-prettyjson.min.css">
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```
<script type="text/javascript" src="ng-prettyjson.min"></script>
```

Then, inject `ngPretty` in your application module:

```
angular.module('myApp', ['ngTiti']);
```

and then just add an `input` of type `daterange`:

```
<input type="daterange" ng-model="myDateRange">
```

Bla bla `todo` and `todo` blabla.

### Attribute

* `dateLimit`: mapped from `limit` attribute;

Example with all above features:

```
<div ng-app='app' ng-controller='ctrl'>
		<pre json='json' pretty-json />
</div>
```

### Features to be implemented:

* TODO

### Build

You can run the tests by running

```
npm install
grunt
```
or
```
npm test
grunt
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```




