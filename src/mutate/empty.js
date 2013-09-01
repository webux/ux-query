/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.empty = function () {
    this.each(function (el) {
        el.innerHTML = null;
    });
};