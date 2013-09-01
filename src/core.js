/*
 * Copyright 2013, WebUX
 * License: MIT
 */

function Query(selector, context) {
    this.init(selector, context);
}

var qp = Query.prototype = Object.create(Array.prototype);

qp.version = '0.1';
qp.selector = '';

qp.init = function (selector) {
    if (typeof selector === 'string') {
        if (selector.substr(0, 1) === '<' && selector.substr(selector.length - 1, 1) === '>') {
            this.parseHTML(selector);
        } else {
            this.parseSelector(selector);
        }
    } else if (selector instanceof Array) {
        this.parseArray(selector);
    } else if (selector instanceof Element) {
        this.parseElement(selector);
    }
};

qp.parseHTML = function (html) {
    var container = document.createElement('div');
    container.innerHTML = html;
    this.length = 0;
    this.push(container.firstElementChild);
};

qp.parseSelector = function (selector, context) {
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

qp.parseArray = function (list) {
    var i = 0,
    len = list.length;
    this.length = 0;
    while (i < len) {
        if (this[i] instanceof Element) {
            this.push(list[i]);
        }
        i += 1;
    }
};

qp.parseElement = function (element) {
    this.length = 0;
    this.push(element);
};

qp.toString = function () {
    if (this.length) {
        return this[0].outerHTML;
    }
};

qp.each = function (fn) {
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
            qp[n] = query.fn[n];
            delete query.fn[n];
        }
    }
    return new Query(selector, context);
};

var fn = exports.query.fn = {};
