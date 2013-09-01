/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn, isDefined */
fn.change = function (handler) {
    if (isDefined(handler)) {
        this.on('change', handler);
    } else {
        this.trigger('change');
    }
    return this;
};

fn.click = function (handler) {
    if (isDefined(handler)) {
        this.bind('click', handler);
    } else {
        this.trigger('click');
    }
    return this;
};