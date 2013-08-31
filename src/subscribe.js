/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/* global ux */
(function () {
    'use strict';

    ux.query.fn.bind = ux.query.fn.on = function (event, handler) {
        this.each(function (el) {
            if (el.attachEvent) {
                el['e' + event + handler] = handler;
                el[event + handler] = function () {
                    el['e' + event + handler](window.event);
                };
                el.attachEvent('on' + event, el[event + handler]);
            } else {
                el.addEventListener(event, handler, false);
            }

            if (!el.eventHolder) {
                el.eventHolder = [];
            }
            el.eventHolder[el.eventHolder.length] = new Array(event, handler);
        });
    };

    ux.query.fn.unbind = ux.query.fn.off = function (event, handler) {
        if(arguments.length === 1) {
            this.unbindAll(event);
        } else {
            this.each(function (el) {
                if (el.detachEvent) {
                    el.detachEvent('on' + event, el[event + handler]);
                    el[event + handler] = null;
                } else {
                    el.removeEventListener(event, handler, false);
                }
            });
        }
    };

    ux.query.fn.unbindAll = function (event) {
        var scope = this;
        this.each(function (el) {
            if (el.eventHolder) {
                var removed = 0, handler;
                for (var i = 0; i < el.eventHolder.length; i++) {
                    if (el.eventHolder[i][0] === event) {
                        handler = el.eventHolder[i][1];
                        scope.off(el, event, handler);
                        if (el.detachEvent) {
                            el.detachEvent('on' + event, el[event + handler]);
                            el[event + handler] = null;
                        } else {
                            el.removeEventListener(event, handler, false);
                        }
                        el.eventHolder.splice(i, 1);
                        removed += 1;
                        i -= 1;
                    }
                }
            }
        });
    };

}());
