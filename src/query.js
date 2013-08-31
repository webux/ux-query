/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global ux */
(function () {
    'use strict';

    ux.query.fn.isVisible = function () {
        var el = this.first();
        if (el) {
            // Return true for document node
            if (el.parentNode.nodeType === 9) {
                return true;
            }

            // Return the false if el has no width or height
            if (el.offsetWidth === 0 || el.offsetHeight === 0) {
                return false;
            }

            // Return false if our element is invisible
            if (this.css(el, 'opacity') === 0 || this.css(el, 'display') === 'none' || this.css('visibility', 'hidden')) {
                return false;
            }

            // element passed
            return true;
        }
        return false;
    };

    ux.query.fn.isChecked = function () {
        var el = this.first();
        if (el) {
            return el.checked;
        }
        return false;
    };

    ux.query.fn.selected = function () {
        var el = this.first();
        if (el) {
            return el[0].options[el[0].selectedIndex];
        }
        return undefined;
    };

//    https://github.com/angular/angular.js/blob/master/src/jqLite.js
    ux.query.fn.val = function(){

    };

}());
