/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.offset = function () {
    if(this.length) {
        return this[0].getBoundingClientRect();
    }
};