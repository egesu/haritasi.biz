import angular from 'angular';

require('ui.leaflet.webpack');
import uirouter from 'angular-ui-router';
import 'angular-spinner';

import category from './category';
import point from './point';
import user from './user';

import AppController from './app.controller';
import AdminRoutes from './admin.routes';

angular.module('haritasi.admin', [
        require('angular-sanitize'),
        require('angular-animate'),
        require('angular-resource'),
        uirouter,
        require('angular-ui-bootstrap'),
        'ui-leaflet',
        'angularSpinner', // loading indicator

        category,
        point,
        user,
    ])
    .config(AdminRoutes)
    .controller('AppController', AppController);
