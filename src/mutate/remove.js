/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.remove = function () {
    this.each(function (el) {
        if (el.parentElement) {
            el.parentElement.removeChild(el);
        }
    });
};