/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, query */
fn.not = function (selector) {
    if (this.length) {
        return query(':not(' + selector + ')', this[0]);
    }
    return query();
};