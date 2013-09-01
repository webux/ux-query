/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.bind = fn.on = function (event, handler) {
    this.each(function (index, el) {
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