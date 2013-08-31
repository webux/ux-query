/**
 * Author: Robert Taylor
 * Date: 8/30/13
 */

(function () {
    'use strict';
    ux.query.fn.first = function () {
        if (this.length) {
            return ux.query(this[0]);
        }
        return null;
    }

    ux.query.fn.last = function () {
        if (this.length) {
            return ux.query(this[this.length - 1]);
        }
        return null;
    }

    ux.query.fn.find = function (selector) {
        if (this.length) {
            return ux.query(selector, this.first());
        }
        return ux.query([]);
    }

    ux.query.fn.not = function (selector) {
        if (this.length) {
            return ux.query(':not(' + selector + ')', this.first());
        }
        return ux.query([]);
    }
}());
