/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, query, isDefined */
fn.get = function (index) {
    if (isDefined(index)) {
        if (Math.abs(index) < this.length) {
            if (index < 0) {
                return this[this.length + index - 1];
            }
            return this[index];
        }
        return null;
    }
    return [].concat(this);
};