/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.css = function (prop, value) {
    var el, styleValue;
    if (this.length) {
        el = this[0];
        if (arguments.length > 1) {
            this.each(function (index, el) {
                el.style[prop] = value;
            });
        }
        if (el.currentStyle) {
            styleValue = el.currentStyle[prop];
        } else if (window.getComputedStyle) {
            styleValue = document.defaultView.getComputedStyle(el[0], null).getPropertyValue(prop);
        }
        return styleValue;
    }
    return null;
};