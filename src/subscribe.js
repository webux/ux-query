/*
 * Copyright 2013, WebUX
 * Licensed under the MIT license.
 * https://github.com/webux/ux-query/blob/master/LICENSE
 * @author Robert Taylor
 */
/* global ux */
(function () {
    'use strict';

    ux.query.fn.bind = function (event, handler) {
        this.each(function (el) {
            el.addEventListener(event, handler);
        });
    };

    ux.query.fn.unbind = function (event, handler) {
        this.each(function (el) {
            el.removeEventListener(event, handler);
        });
    };

}());
