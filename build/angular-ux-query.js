/*
* uxQuery v.0.1.0
* (c) 2013, WebUX
* License: MIT.
*/
(function(exports, global) {
    global["ux"] = exports;
    function Query(selector, context) {
        var i = 0, len, nodes, scope = this;
        function init() {
            if (typeof selector === "string") {
                if (selector.substr(0, 1) === "<") {
                    parseHTML(selector);
                } else {
                    parseSelector(selector);
                }
            } else if (selector instanceof Array) {
                parseArray(selector);
            } else if (selector instanceof Element) {
                parseElement(selector);
            }
        }
        function parseHTML(html) {
            var container = document.createElement("div");
            container.innerHTML = html;
            scope.push(container.firstElementChild);
        }
        function parseSelector(selector) {
            scope.selector = selector;
            if (context instanceof Element) {
                scope.context = context;
            } else if (context instanceof Query) {
                scope.context = context[0];
            } else {
                scope.context = document;
            }
            nodes = scope.context.querySelectorAll(selector);
            len = nodes.length;
            i = 0;
            while (i < len) {
                scope.push(nodes[i]);
                i += 1;
            }
        }
        function parseArray(list) {
            len = list.length;
            while (i < len) {
                if (scope[i] instanceof Element) {
                    scope.push(list[i]);
                }
                i += 1;
            }
        }
        function parseElement(query) {
            scope.push(query);
        }
        init();
    }
    Query.prototype = Object.create(Array.prototype);
    Query.prototype.version = "0.1";
    Query.prototype.selector = "";
    Query.prototype.toString = function() {
        if (this.length) {
            return this[0].outerHTML;
        }
    };
    Query.prototype.each = function(fn) {
        var i = 0, len = this.length, result;
        while (i < len) {
            result = fn(this[i]);
            if (result === false) {
                break;
            }
            i += 1;
        }
        return this;
    };
    exports.query = function query(selector, context) {
        for (var n in query.fn) {
            if (query.fn.hasOwnProperty(n)) {
                Query.prototype[n] = query.fn[n];
                delete query.fn[n];
            }
        }
        return new Query(selector, context);
    };
    exports.query.fn = {};
    ux.query.fn.append = function(element) {
        if (typeof element === "string") {
            element = ux.query(element);
        }
        if (element instanceof Array) {
            if (element.length) {
                element = element[0];
            }
        }
        if (element instanceof Element) {
            this.each(function(el) {
                el.appendChild(element);
            });
        }
    };
    ux.query.fn.prepend = function(element) {
        if (typeof element === "string") {
            element = ux.query(element);
        }
        if (element instanceof Array) {
            if (element.length) {
                element = element[0];
            }
        }
        if (element instanceof Element) {
            this.each(function(el) {
                el.insertBefore(element, el);
            });
        }
    };
    ux.query.fn.remove = function() {
        this.each(function(el) {
            if (el.parentElement) {
                el.parentElement.removeChild(el);
            }
        });
    };
    ux.query.fn.empty = function() {
        this.each(function(el) {
            el.innerHTML = null;
        });
    };
    ux.query.fn.css = function(prop, value) {
        var el = this.first(), styleValue;
        if (el) {
            if (arguments.length > 1) {
                this.each(function(el) {
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
    ux.query.fn.addClass = function(className) {
        this.each(function(el) {
            if (!this.hasClass(el, className)) {
                el.className += " " + className;
            }
        });
        return this;
    };
    ux.query.fn.hasClass = function(className) {
        var el = this.first();
        if (el) {
            var elClasses = " " + el.className + " ";
            return elClasses.indexOf(className) >= 0;
        }
        return false;
    };
    ux.query.fn.removeClass = function(className) {
        this.each(function(el) {
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
    ux.query.fn.removeAttr = function(prop) {
        this.each(function(el) {
            el.removeAttribute(prop);
        });
        return this;
    };
    ux.query.fn.attr = function(prop, value) {
        if (arguments.length > 2) {
            this.each(function(el) {
                el.setAttribute(prop, value);
            });
        }
        if (this.length) {
            return this[0].getAttribute(prop);
        }
    };
    ux.query.fn.data = function(prop, value) {
        return this.attr("data-" + prop, value);
    };
    ux.query.fn.text = function(val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function(el) {
                    el.innerText = val;
                });
            }
            return el[0].innerText;
        }
    };
    ux.query.fn.html = function(val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function(el) {
                    el.innerHTML = val;
                });
            }
            return el[0].innerHTML;
        }
    };
    ux.query.fn.isVisible = function() {
        var el = this.first();
        if (el) {
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
    ux.query.fn.isChecked = function() {
        var el = this.first();
        if (el) {
            return el.checked;
        }
        return false;
    };
    ux.query.fn.selected = function() {
        var el = this.first();
        if (el) {
            return el[0].options[el[0].selectedIndex];
        }
        return undefined;
    };
    ux.query.fn.val = function() {};
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
    ux.query.fn.first = function() {
        if (this.length) {
            return ux.query(this[0]);
        }
        return ux.query([]);
    };
    ux.query.fn.last = function() {
        if (this.length) {
            return ux.query(this[this.length - 1]);
        }
        return ux.query([]);
    };
    ux.query.fn.find = function(selector) {
        if (this.length) {
            return ux.query(selector, this.first());
        }
        return ux.query([]);
    };
    ux.query.fn.not = function(selector) {
        if (this.length) {
            return ux.query(":not(" + selector + ")", this.first());
        }
        return ux.query([]);
    };
    ux.query.fn.bind = ux.query.fn.on = function(event, handler) {
        this.each(function(el) {
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
    ux.query.fn.unbind = ux.query.fn.off = function(event, handler) {
        if (arguments.length === 1) {
            this.unbindAll(event);
        } else {
            this.each(function(el) {
                if (el.detachEvent) {
                    el.detachEvent("on" + event, el[event + handler]);
                    el[event + handler] = null;
                } else {
                    el.removeEventListener(event, handler, false);
                }
            });
        }
    };
    ux.query.fn.unbindAll = function(event) {
        var scope = this;
        this.each(function(el) {
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
    var module;
    try {
        module = angular.module("ux");
    } catch (e) {
        module = angular.module("ux", []);
    }
    module.factory("$query", function() {
        return ux.query;
    });
})({}, function() {
    return this;
}());