/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));
//
// const app = new Vue({
//     el: '#app'
// });

require('ui.leaflet.webpack');

import HomeController from './home.controller';

angular.module('haritasi', [
    require('angular-sanitize'),
    require('angular-animate'),
    require('angular-resource'),
    require('angular-ui-bootstrap'),
    'ui-leaflet',
]).controller('HomeController', HomeController);
