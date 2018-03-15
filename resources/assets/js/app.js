import angular from 'angular';

require('ui.leaflet.webpack');
import 'angular-spinner';

import HomeController from './home.controller';

angular.module('haritasi', [
  require('angular-sanitize'),
  require('angular-animate'),
  require('angular-resource'),
  require('angular-ui-bootstrap'),
  'ui-leaflet',
  'angularSpinner',
]).controller('HomeController', HomeController);