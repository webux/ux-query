/*global angular, ux, console, $ */
(function () {
    'use strict';
    var module = angular.module('app', ['ux']);

    module.controller('MainCtrl', function ($scope, $query) {

//        ux.query.ready(function () {
//            console.log('DOM is ready');
//        });

        $query('#btnGet').on('click', function () {
            console.log('click', $query('#input').val());
        });

        $query('#btnSet').on('click', function () {
            $query('#input').val('Hello');
        });

        $query('#btnAppend').on('click', function () {
            // This does not work
            $query('#root').append('append');
//            $query('#root').append('<div>Append new item</div>');
        });

        $query('#btnPrepend').on('click', function () {
            $query('#root').prepend('<div>Prepend new item</div>');
        });

        return;


        var rootEl = $query('#root');
        console.log('rootEl', rootEl);

        var clickHandler = function (evt) {
            console.log('click here', evt);
//            rootEl.off('click', clickHandler);
//            rootEl.isSubscribed('click', clickHandler);
            rootEl.off('click');
//            rootEl.isSubscribed('click', clickHandler);
        };
        rootEl.on('click', clickHandler);
        rootEl.on('click', clickHandler);

        return;

        var rootEl = $query('<div><div class="active">Hello world</div><div>Goodbye</div></div>');

        console.log('rootEl', rootEl);
//        rootEl.not('.active').css('color', 'green');
        rootEl.find('.active').css('color', 'blue');
        rootEl.find('.active').html('<strong>Yellow</strong>');
        rootEl.not('.active').remove();
        console.log('result', rootEl.toString());
//        console.log('rootEl', rootEl.element);
//        var els = $query('.active', rootEl).all();
//        console.log('els', els.length);
//        els[0].addClass('color alizarin');

        rootEl = $('<div><div class="active">Hello world</div></div>');
        console.log('rootEl2', rootEl, rootEl.hasClass('active'));
//        rootEl.addClass('color alizarin');
//        console.log('rootEl3', rootEl);

//        var el = document.querySelector('#root');

//        console.log('el', el);
//        console.log('el2', rootEl.get());
//        var matches = el.querySelectorAll('.active');
//        console.log('matches', matches);

//        var firstEl = rootEl.first();
//        firstEl.addClass('color');
//        firstEl.addClass('sun-flower');
//
//        var lastEl = q.last();
//        lastEl.addClass('color');
//        lastEl.addClass('sun-flower');

//        var notEls = q.not();
//        notEls[0].addClass('color alizarin');
    });

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
}());
