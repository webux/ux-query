/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, query */
fn.find = function (selector) {
    if (this.length) {
        return query(selector, this[0]);
    }
    return query();
};