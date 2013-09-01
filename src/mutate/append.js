/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, ux */
fn.append = function (element) {

    if (typeof element === 'string') {
        element = ux.query(element);
    }

    if (element instanceof Array) {
        if (element.length) {
            element = element[0];
        }
    }

    if (element instanceof Element) {
        this.each(function (index, el) {
            el.appendChild(element);
        });
    }
};