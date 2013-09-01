/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.remove = function () {
    this.each(function (index, el) {
        if (el.parentElement) {
            el.parentElement.removeChild(el);
        }
    });
};