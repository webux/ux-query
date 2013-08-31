Query
========

A very lightweight DOM query selector and modifier (~5Kb minified). Works well as an alternative to heavier DOM selection libraries, such as jQuery, Zepto, HTML.js, Sizzle, and other similar libraries.

## API Reference ##

**Constructor**

	var queryNodes = ux.query(selector);

**DOM Ready**

	ux.query.ready(handler);	

**DOM Selectors**

- **first** () - Returns the first matching DOM element
- **last** () - Returns the last matching DOM element
- **find** (selector) - Returns an array of matching DOM elements 
- **not** (selector) - Returns an array of DOM elements that do not match selector

**DOM Modifiers**

- **append** (el) - appends DOM to another element (context)
- **prepend** (el) - prepends DOM to another element (context)
- **remove** (el) - removes element from DOM.
- **empty** () - removes all the contents of a DOM element.
- **text** ([value]) - Getter / Setter - Getter returns text value. Setter sets text value.
- **html** ([value(string)]) = Getter / Setter - Getter return html DOM. Setter sets DOM with HTML string.
- **addClass** (className) - Adds a single class to DOM element
- **removeClass** (className) - Removes a single class from DOM element
- **hasClass** (className) - Returns boolean indicating if DOM element has class
- **attr** (key [,value]) - Getter / Setter - Getter returns value from DOM element. Setter sets value on DOM element.
- **removeAttr** (key) - Removes attribute from DOM element.
- **css** (styleProp, [,value]) - Getter / Setter - Getter returns the style value from DOM element.

**DOM Queries**

- **isVisible** () - Returns boolean indicating if DOM element is currently being displayed. Returns false if opacity is 0, or display is "none" or visibility is "hidden" in addition to some other checks.
- **isChecked** () - Returns boolean if a radio or checkbox type is checked.
- **selected** () - Returns value of from DOM select tag.
- **[TODO] val** (value) - Getter /Setter...

**DOM Subscriptions**

- **bind** (eventType, handler) - Subscribes to a handler to an event on DOM element.
- **unbind** (eventType [,handler]) - Unsubscribes a handler or all handlers from a DOM element.
- **[TODO] unbindAll** () - Unsubscribes all events handler from all events on a DOM element.

Angular Development
--------

**Include "ux" module**
	
	angular.module('app', ['ux']);

***$query* injection**

$query is a factory. It can be injected into any subset of angular that supports IoC.

	module.controller('MyController', function ($scope, $query) {...}
