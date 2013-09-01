/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.isChecked = function () {
    if (this.length) {
        return this[0].checked;
    }
    return false;
};