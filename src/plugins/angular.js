/*
 * Copyright 2013, WebUX
 * Licensed under the MIT license.
 * https://github.com/webux/ux-query/blob/master/LICENSE
 * @author Robert Taylor
 */
/*global angular, ux */
(function () {
    'use strict';
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