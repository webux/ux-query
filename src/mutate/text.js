/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.text = function (val) {
    if (this.length) {
        var el = this[0];
        if (arguments.length > 0) {
            this.each(function (index, el) {
                el.innerText = val;
            });
        }
        return el.innerText;
    }
};