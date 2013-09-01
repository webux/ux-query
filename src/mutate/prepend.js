/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.prepend = function (element) {
    if (typeof element === 'string') {
        element = ux.query(element);
    }

    if (element instanceof Array) {
        if (element.length) {
            element = element[0];
        }
    }

    if (element instanceof Element) {
        this.each(function (el) {
            if (el.childNodes.length) {
                el.insertBefore(element, el.childNodes[0]);
            } else {
                el.appendChild(element);
            }
        });
    }
};