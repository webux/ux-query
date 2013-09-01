/*
* uxQuery v.0.1.0
* (c) 2013, WebUX
* License: MIT.
*/
(function(exports, global) {
    global["ux"] = exports;
    function Query(selector, context) {
        this.init(selector, context);
    }
    var qp = Query.prototype = Object.create(Array.prototype);
    qp.version = "0.1";
    qp.selector = "";
    qp.init = function(selector, context) {
        if (typeof selector === "string") {
            if (selector.substr(0, 1) === "<" && selector.substr(selector.length - 1, 1) === ">") {
                this.parseHTML(selector);
            } else {
                this.parseSelector(selector, context);
            }
        } else if (selector instanceof Array) {
            this.parseArray(selector);
        } else if (selector instanceof Element) {
            this.parseElement(selector);
        }
    };
    qp.parseHTML = function(html) {
        var container = document.createElement("div");
        container.innerHTML = html;
        this.length = 0;
        this.push(container.firstElementChild);
    };
    qp.parseSelector = function(selector, context) {
        var i, nodes, len;
        this.selector = selector;
        if (context instanceof Element) {
            this.context = context;
        } else if (context instanceof Query) {
            this.context = context[0];
        } else {
            this.context = document;
        }
        nodes = this.context.querySelectorAll(selector);
        len = nodes.length;
        i = 0;
        this.length = 0;
        while (i < len) {
            this.push(nodes[i]);
            i += 1;
        }
    };
    qp.parseArray = function(list) {
        var i = 0, len = list.length;
        this.length = 0;
        while (i < len) {
            if (this[i] instanceof Element) {
                this.push(list[i]);
            }
            i += 1;
        }
    };
    qp.parseElement = function(element) {
        this.length = 0;
        this.push(element);
    };
    qp.toString = function() {
        if (this.length) {
            return this[0].outerHTML;
        }
    };
    qp.each = function(fn) {
        var i = 0, len = this.length, result;
        while (i < len) {
            result = fn.apply(this[i], [ i, this[i] ]);
            if (result === false) {
                break;
            }
            i += 1;
        }
        return this;
    };
    qp.noConflict = function() {
        delete window.$;
        return ux.query;
    };
    var isDefined = function(val) {
        return val !== undefined;
    };
    function query(selector, context) {
        for (var n in query.fn) {
            if (query.fn.hasOwnProperty(n)) {
                qp[n] = query.fn[n];
                delete query.fn[n];
            }
        }
        return new Query(selector, context);
    }
    exports.query = query;
    var fn = exports.query.fn = {};
    if (window.$ === undefined) {
        window.$ = query;
    }
    var callbacks = [];
    ux.query.ready = function(callback) {
        callbacks.push(callback);
    };
    var DOMContentLoaded;
    function invokeCallbacks() {
        var i = 0, len = callbacks.length;
        while (i < len) {
            callbacks[i]();
            i += 1;
        }
        callbacks.length = 0;
    }
    if (document.addEventListener) {
        DOMContentLoaded = function() {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            invokeCallbacks();
        };
    } else if (document.attachEvent) {
        DOMContentLoaded = function() {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                invokeCallbacks();
            }
        };
    }
    if (document.readyState === "complete") {
        setTimeout(invokeCallbacks, 1);
    }
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        window.addEventListener("load", invokeCallbacks, false);
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", DOMContentLoaded);
        window.attachEvent("onload", invokeCallbacks);
    }
    fn.removeAttr = function(prop) {
        this.each(function(index, el) {
            el.removeAttribute(prop);
        });
        return this;
    };
    fn.attr = function(prop, value) {
        if (arguments.length > 2) {
            this.each(function(index, el) {
                el.setAttribute(prop, value);
            });
        }
        if (this.length) {
            return this[0].getAttribute(prop);
        }
    };
    fn.data = function(prop, value) {
        return this.attr("data-" + prop, value);
    };
    fn.addClass = function(className) {
        this.each(function(index, el) {
            if (!this.hasClass(el, className)) {
                el.className += " " + className;
            }
        });
        return this;
    };
    fn.hasClass = function(className) {
        var el;
        if (this.length) {
            el = this[0];
            var elClasses = " " + el.className + " ";
            return elClasses.indexOf(className) >= 0;
        }
        return false;
    };
    fn.removeClass = function(className) {
        this.each(function(index, el) {
            var newClass = " " + el.className.replace(/[\t\r\n]/g, " ") + " ";
            if (this.hasClass(el, className)) {
                while (newClass.indexOf(" " + className + " ") >= 0) {
                    newClass = newClass.replace(" " + className + " ", " ");
                }
                el.className = newClass.replace(/^\s+|\s+$/g, "");
            }
        });
        return this;
    };
    fn.css = function(prop, value) {
        var el, styleValue;
        if (this.length) {
            el = this[0];
            if (arguments.length > 1) {
                this.each(function(index, el) {
                    el.style[prop] = value;
                });
            }
            if (el.currentStyle) {
                styleValue = el.currentStyle[prop];
            } else if (window.getComputedStyle) {
                styleValue = document.defaultView.getComputedStyle(el[0], null).getPropertyValue(prop);
            }
            return styleValue;
        }
        return null;
    };
    fn.prop = function(name, value) {
        if (this.length) {
            if (arguments.length > 2) {
                this[0][name] = value;
            } else {
                return this[0][name];
            }
        }
    };
    fn.is = function(name) {
        name = name.split(":").join("");
        return this.prop(name);
    };
    fn.after = function(content, elements) {};
    fn.append = function(element) {
        if (typeof element === "string") {
            element = ux.query(element);
        }
        if (element instanceof Array) {
            if (element.length) {
                element = element[0];
            }
        }
        if (element instanceof Element) {
            this.each(function(index, el) {
                el.appendChild(element);
            });
        }
    };
    fn.before = function(content, elements) {};
    fn.empty = function() {
        this.each(function(index, el) {
            el.innerHTML = null;
        });
    };
    fn.html = function(val) {
        if (this.length) {
            var el = this[0];
            if (arguments.length > 0) {
                this.each(function(index, el) {
                    el.innerHTML = val;
                });
            }
            return el.innerHTML;
        }
    };
    fn.prepend = function(element) {
        if (typeof element === "string") {
            element = ux.query(element);
        }
        if (element instanceof Array) {
            if (element.length) {
                element = element[0];
            }
        }
        if (element instanceof Element) {
            this.each(function(index, el) {
                if (el.childNodes.length) {
                    el.insertBefore(element, el.childNodes[0]);
                } else {
                    el.appendChild(element);
                }
            });
        }
    };
    fn.remove = function() {
        this.each(function(index, el) {
            if (el.parentElement) {
                el.parentElement.removeChild(el);
            }
        });
    };
    fn.text = function(val) {
        if (this.length) {
            var el = this[0];
            if (arguments.length > 0) {
                this.each(function(index, el) {
                    el.innerText = val;
                });
            }
            return el.innerText;
        }
    };
    fn.isChecked = function() {
        if (this.length) {
            return this[0].checked;
        }
        return false;
    };
    fn.isVisible = function() {
        var el;
        if (this.length) {
            el = this[0];
            if (el.parentNode.nodeType === 9) {
                return true;
            }
            if (el.offsetWidth === 0 || el.offsetHeight === 0) {
                return false;
            }
            if (this.css(el, "opacity") === 0 || this.css(el, "display") === "none" || this.css("visibility", "hidden")) {
                return false;
            }
            return true;
        }
        return false;
    };
    fn.val = function(value) {
        var el, result, i, len, options;
        if (this.length) {
            el = this[0];
            if (arguments.length) {
                el.value = value;
            } else {
                if (el.nodeName === "SELECT" && el.multiple) {
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
    fn.bind = fn.on = function(event, handler) {
        this.each(function(index, el) {
            if (el.attachEvent) {
                el["e" + event + handler] = handler;
                el[event + handler] = function() {
                    el["e" + event + handler](window.event);
                };
                el.attachEvent("on" + event, el[event + handler]);
            } else {
                el.addEventListener(event, handler, false);
            }
            if (!el.eventHolder) {
                el.eventHolder = [];
            }
            el.eventHolder[el.eventHolder.length] = new Array(event, handler);
        });
    };
    fn.change = function(handler) {
        if (isDefined(handler)) {
            this.on("change", handler);
        } else {
            this.trigger("change");
        }
        return this;
    };
    fn.click = function(handler) {
        if (isDefined(handler)) {
            this.bind("click", handler);
        } else {
            this.trigger("click");
        }
        return this;
    };
    fn.trigger = function(eventName, data) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(eventName, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = eventName;
        }
        event.eventName = eventName;
        event.data = data;
        this.each(function(index, el) {
            if (document.createEvent) {
                el.dispatchEvent(event);
            } else {
                el.fireEvent("on" + event.eventType, event);
            }
        });
    };
    fn.unbind = fn.off = function(event, handler) {
        if (arguments.length === 1) {
            this.unbindAll(event);
        } else {
            this.each(function(index, el) {
                if (el.detachEvent) {
                    el.detachEvent("on" + event, el[event + handler]);
                    el[event + handler] = null;
                } else {
                    el.removeEventListener(event, handler, false);
                }
            });
        }
    };
    fn.unbindAll = function(event) {
        var scope = this;
        this.each(function(index, el) {
            if (el.eventHolder) {
                var removed = 0, handler;
                for (var i = 0; i < el.eventHolder.length; i++) {
                    if (el.eventHolder[i][0] === event) {
                        handler = el.eventHolder[i][1];
                        scope.off(el, event, handler);
                        if (el.detachEvent) {
                            el.detachEvent("on" + event, el[event + handler]);
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
})({}, function() {
    return this;
}());