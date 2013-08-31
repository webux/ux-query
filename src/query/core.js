/**
 * Author: Robert Taylor
 * Date: 8/30/13
 */

(function () {
    'use strict';
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

    var q = Query.prototype = Object.create(Array.prototype);

    q.version = '0.1';
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

    var setup = false;
    function query(selector, context) {
        if(!setup) {
            console.log('whois', query.fn);
            for(var n in query.fn) {
                Query.prototype[n] = query.fn[n];
            }
            setup = true;
        }
        return new Query(selector, context);
    }

    query.fn = {};

    window.ux = window.ux || {};
    window.ux.query = query;
}());