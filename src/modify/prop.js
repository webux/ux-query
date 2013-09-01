/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.prop = function (name, value) {
    if (this.length) {
        if (arguments.length > 2) {
            this[0][name] = value;
        } else {
            return this[0][name];
        }
    }
};

fn.is = function (name) {
    name = name.split(':').join('');
    return this.prop(name);
};