/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global ux */
var fn = ux.query.fn;
fn.append = function (element) {

    if (typeof element === 'string') {
        element = ux.query(element);
    }

    if (element instanceof Array) {
        if (element.length) {
            element = element[0];
        }
    }

    if (element instanceof Element) {
        this.each(function (el) {
            el.appendChild(element);
        });
    }
};

fn.prepend = function (element) {
    if (typeof element === 'string') {
        element = ux.query(element);
    }

    if (element instanceof Array) {
        if (element.length) {
            element = element[0];
        }
    }

    if (element instanceof Element) {
        this.each(function (el) {
            if (el.childNodes.length) {
                el.insertBefore(element, el.childNodes[0]);
            } else {
                el.append(element);
            }
        });
    }
};

fn.before = function (content, elements) {

};

fn.after = function (content, elements) {

};

fn.remove = function () {
    this.each(function (el) {
        if (el.parentElement) {
            el.parentElement.removeChild(el);
        }
    });
};

fn.empty = function () {
    this.each(function (el) {
        el.innerHTML = null;
    });
};
