/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global ux */
var fn = ux.query.fn;
fn.css = function (prop, value) {
    var el, styleValue;
    if (this.length) {
        el = this[0];
        if (arguments.length > 1) {
            this.each(function (el) {
                el.style[prop] = value;
            });
        }
        if (el.currentStyle) {
            styleValue = el.currentStyle[prop];
        } else if (window.getComputedStyle) {
            styleValue = document.defaultView.getComputedStyle(el[0], null).getPropertyValue(prop);
        }
        return styleValue;
    }
    return null;
};

fn.addClass = function (className) {
    this.each(function (el) {
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
    this.each(function (el) {
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

fn.text = function (val) {
    if (this.length) {
        el = this[0];
        if (arguments.length > 0) {
            this.each(function (el) {
                el.innerText = val;
            });
        }
        return el[0].innerText;
    }
};

fn.html = function (val) {
    if (this.length) {
        el = this[0];
        if (arguments.length > 0) {
            this.each(function (el) {
                el.innerHTML = val;
            });
        }
        return el[0].innerHTML;
    }
};
