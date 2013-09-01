/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.addClass = function (className) {
    this.each(function (index, el) {
        if (!this.hasClass(el, className)) {
            el.className += ' ' + className;
        }
    });
    return this;
};

fn.hasClass = function (className) {
    var el;
    if (this.length) {
        el = this[0];
        var elClasses = ' ' + el.className + ' ';
        return (elClasses.indexOf(className) >= 0);
    }
    return false;
};

fn.removeClass = function (className) {
    this.each(function (index, el) {
        var newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(el, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            el.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    });
    return this;
};