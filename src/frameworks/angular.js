/*
 * Copyright 2013, WebUX
 * License: MIT
 */
/* global angular, ux */
var module;
try {
    module = angular.module('ux');
} catch (e) {
    module = angular.module('ux', []);
}
module.factory('$query', function () {
    return ux.query;
});
