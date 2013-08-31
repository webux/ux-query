/**
 * Author: Robert Taylor
 * Date: 8/14/13
 * http://www.w3schools.com/dom/dom_nodes_add.asp
 */
(function () {
    'use strict';

    var q,
        VERSION = '0.1';

    function Query(selector, context) {
        var i = 0, len, nodes, scope = this;

        function init() {
            if (typeof selector === 'string') {
                if (selector.substr(0, 1) === '<') {
                    parseHTMLString(selector);
                } else {
                    parseSelectorString(selector)
                }
            } else if (selector instanceof Array) {
                parseArray(selector);
            } else if (selector instanceof Element) {
                parseElement(selector);
            }
        }

        function parseHTMLString(html) {
            var container = document.createElement('div');
            container.innerHTML = html;
            scope.push(container.firstElementChild);
        }

        function parseSelectorString(selector) {
            scope.selector = selector;

            if (context instanceof Element) {
                scope.context = context;
            } else if (context instanceof Query) {
                scope.context = context[0];
            }
            nodes = scope.context.querySelectorAll(selector)
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

    q = Query.prototype = Object.create(Array.prototype);

    q.version = VERSION;
    q.selector = '';

    q.toString = function () {
        if (this.length) {
            return this[0].outerHTML;
        }
    }

    q.each = function (fn) {
        var i = 0, len = this.length, result;
        while (i < len) {
            result = fn(this[i]);
            if (result === false) {
                break;
            }
            i += 1;
        }
        return this;
    }

    q.append = function (element) {

        if (typeof element === 'string') {
            element = query(element);
        }

        if (element instanceof Query) {
            if (element.length) {
                element = element[0];
            }
        }

        if (element instanceof Element) {
            this.each(function (el) {
                el.appendChild(element);
            })
        }
    }

    q.prepend = function (element) {
        if (typeof element === 'string') {
            element = query(element);
        }

        if (element instanceof Query) {
            if (element.length) {
                element = element[0];
            }
        }

        if (element instanceof Element) {
            this.each(function (el) {
                el.insertBefore(element, el);
            })
        }
    }

    q.remove = function () {
        this.each(function (el) {
            if (el.parentElement) {
                el.parentElement.removeChild(el);
            }
        })
    }

    q.empty = function () {
        this.each(function (el) {
            el.innerHTML = null;
        })
    }

    q.first = function () {
        if (this.length) {
            return query(this[0]);
        }
        return null;
    }

    q.last = function () {
        if (this.length) {
            return query(this[this.length - 1]);
        }
        return null;
    }

    q.is = function (selector) {
        if (this.length) {
            return query(selector, this.first());
        }
        return query([]);
    }

    q.not = function (selector) {
        if (this.length) {
            return query(':not(' + selector + ')', this.first());
        }
        return query([]);
    }

    q.css = function (prop, value) {
        var el = this.first(), styleValue;
        if (el) {
            if (arguments.length > 1) {
                this.each(function (el) {
                    el.style[prop] = value;
                })
            }
            if (el.currentStyle) {
                styleValue = el.currentStyle[prop];
            } else if (window.getComputedStyle) {
                styleValue = document.defaultView.getComputedStyle(el[0], null).getPropertyValue(prop);
            }
            return styleValue;
        }
        return null;
    }

    q.addClass = function (className) {
        this.each(function (el) {
            if (!hasClass(el, className)) {
                el.className += ' ' + className;
            }
        });
        return this;
    }

    q.hasClass = function (className) {
        var el = this.first();
        if (el) {
            var elClasses = ' ' + el.className + ' ';
            return (elClasses.indexOf(className) >= 0);
        }
        return false;
    }

    q.removeClass = function (className) {
        this.each(function (el) {
            var newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' ';
            if (hasClass(el, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                el.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        });
        return this;
    }

    q.removeAttr = function (prop) {
        this.each(function (el) {
            el.removeAttribute(prop);
        });
        return this;
    }

    q.attr = function (prop, value) {
        if (arguments.length > 2) {
            el.setAttribute(prop, value);
            return value;
        }
        return this;
    }

    q.text = function (val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function (el) {
                    el.innerText = val;
                })
            }
            return el[0].innerText;
        }
    }

    q.html = function (val) {
        var el = this.first();
        if (el) {
            if (arguments.length > 0) {
                this.each(function (el) {
                    el.innerHTML = val;
                })
            }
            return el[0].innerHTML;
        }
    }

    q.bind = function (event, handler) {
        this.each(function (el) {
            el.addEventListener(event, handler);
        });
    }

    q.unbind = function (event, handler) {
        this.each(function (el) {
            el.removeEventListener(event, handler);
        })
    }


    q.isVisible = function () {
         var el = this.first();
         if (el) {
             // Return true for document node
             if (el.parentNode.nodeType === 9) {
                 return true;
             }

             // Return the false if el has no width or height
             if (el.offsetWidth === 0 || el.offsetHeight === 0) {
                 return false;
             }

             // Return false if our element is invisible
             if (css(el, 'opacity') === 0 || css(el, 'display') === 'none' || css('visibility', 'hidden')) {
                 return false;
             }

             // element passed
             return true;
         }
         return false;
     }

     q.isChecked = function () {
         var el = this.first();
         if (el) {
             return el.checked;
         }
         return false;
     }

     q.selected = function () {
         var el = this.first();
         if (el) {
             return el[0].options[el[0].selectedIndex];
         }
         return undefined;
     }

    function query(selector, context) {
        return new Query(selector, context);
    }

    window.ux = window.ux || {};
    window.ux.query = query;

    var module;
    try {
        module = angular.module('ux');
    } catch (e) {
        module = angular.module('ux', []);
    }
    module.factory('$query', function () {
        return ux.query;
    });
}());
