/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.removeAttr = function (prop) {
    this.each(function (el) {
        el.removeAttribute(prop);
    });
    return this;
};

fn.attr = function (prop, value) {
    if (arguments.length > 2) {
        this.each(function (el) {
            el.setAttribute(prop, value);
        });
    }
    if (this.length) {
        return this[0].getAttribute(prop);
    }
};

fn.data = function (prop, value) {
    return this.attr('data-' + prop, value);
};