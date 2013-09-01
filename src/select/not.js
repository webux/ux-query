/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, ux */
fn.not = function (selector) {
    if (this.length) {
        return ux.query(':not(' + selector + ')', this[0]);
    }
    return ux.query();
};