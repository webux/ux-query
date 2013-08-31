/**
 * Author: Robert Taylor
 * Date: 8/30/13
 */

(function () {
    'use strict';

    ux.query.fn.bind = function (event, handler) {
        this.each(function (el) {
            el.addEventListener(event, handler);
        });
    }

    ux.query.fn.unbind = function (event, handler) {
        this.each(function (el) {
            el.removeEventListener(event, handler);
        })
    }

}());
