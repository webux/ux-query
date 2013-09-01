/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/*global fn */
fn.trigger = function (eventName, data) {
    var event;
    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;
    event.data = data;
    this.each(function (index, el) {
        if (document.createEvent) {
            el.dispatchEvent(event);
        } else {
            el.fireEvent("on" + event.eventType, event);
        }
    });
};

