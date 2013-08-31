/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global ux */
var fn = ux.query.fn;
fn.isVisible = function () {
    var el;
    if (this.length) {
        el = this[0];
        // Return true for document node
        if (el.parentNode.nodeType === 9) {
            return true;
        }

        // Return the false if el has no width or height
        if (el.offsetWidth === 0 || el.offsetHeight === 0) {
            return false;
        }

        // Return false if our element is invisible
        if (this.css(el, 'opacity') === 0 || this.css(el, 'display') === 'none' || this.css('visibility', 'hidden')) {
            return false;
        }

        // element passed
        return true;
    }
    return false;
};

fn.isChecked = function () {
    if (this.length) {
        return this[0].checked;
    }
    return false;
};

fn.val = function (value) {
    var el, result, i, len, options;
    if (this.length) {
        el = this[0];
        if (arguments.length) {
            el.value = value;
        } else {
            if (el.nodeName === 'SELECT' && el.multiple) {
                result = [];
                i = 0;
                options = el.options;
                len = options.length;
                while (i < len) {
                    if (options) {
                        result.push(options[i].value || options[0].text);
                    }
                }
                return result.length === 0 ? null : result;
            }
            return el.value;
        }
    }
};
