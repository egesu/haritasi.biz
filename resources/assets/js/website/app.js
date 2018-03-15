window._ = require('lodash');
window.angular = require('angular');

require('ui.leaflet.webpack');
require('Leaflet.vector-markers');
import uirouter from 'angular-ui-router';
import 'angular-spinner';

import core from '../admin/core';
import home from './home';
import category from '../admin/category';
import point from './point';
// import user from './user';

import AppController from './app.controller';
import AppRoutes from './web.routes';

angular.module('haritasi.web', [
    require('angular-sanitize'),
    require('angular-animate'),
    require('angular-resource'),
    uirouter,
    require('angular-ui-bootstrap'),
    'ui-leaflet',
    'angularSpinner', // loading indicator

    core,
    home,
    category,
    point,
    // user,
  ])
  .config(AppRoutes)
  .controller('AppController', AppController);