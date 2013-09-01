/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, ux */
fn.first = function (returnElement) {
    if (this.length) {
        if (returnElement) {
            return this[0];
        }
        return ux.query(this[0]);
    }
    if (returnElement) {
        return null;
    }
    return ux.query();
};