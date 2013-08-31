/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global ux */
var fn = ux.query.fn;
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

fn.last = function (returnElement) {
    if (this.length) {
        if (returnElement) {
            return this[this.length - 1];
        }
        return ux.query(this[this.length - 1]);
    }
    if (returnElement) {
        return null;
    }
    return ux.query();
};

fn.find = function (selector) {
    if (this.length) {
        return ux.query(selector, this[0]);
    }
    return ux.query();
};

fn.not = function (selector) {
    if (this.length) {
        return ux.query(':not(' + selector + ')', this[0]);
    }
    return ux.query();
};
