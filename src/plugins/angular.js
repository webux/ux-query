/**
 * Author: Robert Taylor
 * Date: 8/30/13
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