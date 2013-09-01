/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, query */
fn.get = function (index) {
    if(Math.abs(index) < this.length) {
        if(index < 0) {
            return this[this.length + index - 1];
        }
        return this[index];
    }
    return null;
};