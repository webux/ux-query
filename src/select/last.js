/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, ux */
fn.last = function (returnElement) {
    if (this.length) {
        if (returnElement) {
            return this[this.length - 1];
        }
        return ux.query(this[this.length - 1]);
    }
    if (returnElement) {
        return null;
    }
    return ux.query();
};