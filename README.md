ux-Query
========

A very lightweight DOM query selector and modifier (~3Kb). It is meant to handle the common selection cases. Works well as an alternative to heavier DOM selection libraries when all you need is a nice API to what the browser already offers.

## API Reference ##

**Constructor**

	var queryNodes = ux.query(selector);
	
**DOM Selectors**

- **first** () - Returns the first matching DOM element
- **last** () - Returns the last matching DOM element
- **all** () - Returns an array of matching DOM elements 
- **not** () - Returns an array of DOM elements that do not match selector

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
- **selectedOption** () - Returns value of from DOM select tag.
- **val** (value) - Getter /Setter...

**DOM Subscriptions**

- **bind** (eventType, handler) - Subscribes to a handler to an event on DOM element.
- **unbind** (eventType [,handler]) - Unsubscribes a handler or all handlers from a DOM element.
- **unbindAll** () - Unsubscribes all events handler from all events on a DOM element.

Angular Development
--------
Instructions on how to with AngularJS