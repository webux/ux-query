/*
 * Copyright 2013, WebUX
 * Licensed under the MIT license.
 * https://github.com/webux/ux-query/blob/master/LICENSE
 * @author Robert Taylor
 */
/*global ux */
(function () {
    'use strict';
    ux.query.fn.first = function () {
        if (this.length) {
            return ux.query(this[0]);
        }
        return ux.query([]);
    };

    ux.query.fn.last = function () {
        if (this.length) {
            return ux.query(this[this.length - 1]);
        }
        return ux.query([]);
    };

    ux.query.fn.find = function (selector) {
        if (this.length) {
            return ux.query(selector, this.first());
        }
        return ux.query([]);
    };

    ux.query.fn.not = function (selector) {
        if (this.length) {
            return ux.query(':not(' + selector + ')', this.first());
        }
        return ux.query([]);
    };
}());
