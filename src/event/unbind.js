/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.unbind = fn.off = function (event, handler) {
    if (arguments.length === 1) {
        this.unbindAll(event);
    } else {
        this.each(function (index, el) {
            if (el.detachEvent) {
                el.detachEvent('on' + event, el[event + handler]);
                el[event + handler] = null;
            } else {
                el.removeEventListener(event, handler, false);
            }
        });
    }
};
