/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.unbindAll = function (event) {
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