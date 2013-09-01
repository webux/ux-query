/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.find = function (selector) {
    if (this.length) {
        return ux.query(selector, this[0]);
    }
    return ux.query();
};