/*
 * Copyright 2013, WebUX
 * Licensed under the MIT license.
 * https://github.com/webux/ux-query/blob/master/LICENSE
 * @author Robert Taylor
 */
/*global ux */
(function () {
    'use strict';
    ux.query.fn.append = function (element) {

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

    ux.query.fn.prepend = function (element) {
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
                el.insertBefore(element, el);
            });
        }
    };

    ux.query.fn.remove = function () {
        this.each(function (el) {
            if (el.parentElement) {
                el.parentElement.removeChild(el);
            }
        });
    };

    ux.query.fn.empty = function () {
        this.each(function (el) {
            el.innerHTML = null;
        });
    };

    ux.query.fn.css = function (prop, value) {
        var el = this.first(), styleValue;
        if (el) {
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

    ux.query.fn.addClass = function (className) {
        this.each(function (el) {
            if (!this.hasClass(el, className)) {
                el.className += ' ' + className;
            }
        });
        return this;
    };

    ux.query.fn.hasClass = function (className) {
        var el = this.first();
        if (el) {
            var elClasses = ' ' + el.className + ' ';
            return (elClasses.indexOf(className) >= 0);
        }
        return false;
    };

    ux.query.fn.removeClass = function (className) {
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

    ux.query.fn.removeAttr = function (prop) {
        this.each(function (el) {
            el.removeAttribute(prop);
        });
        return this;
    };

    ux.query.fn.attr = function (prop, value) {
        if (arguments.length > 2) {
            this.each(function (el) {
                el.setAttribute(prop, value);
            });
        }
        if (this.length) {
            return this[0].getAttribute(prop);
        }
    };

    ux.query.fn.data = function (prop, value) {
        return this.attr('data-' + prop, value);
    };

    ux.query.fn.text = function (val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function (el) {
                    el.innerText = val;
                });
            }
            return el[0].innerText;
        }
    };

    ux.query.fn.html = function (val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function (el) {
                    el.innerHTML = val;
                });
            }
            return el[0].innerHTML;
        }
    };
}());
