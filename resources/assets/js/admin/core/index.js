import angular from 'angular';
import angularResource from 'angular-resource';

import ResourceService from './resource.service';
import { getDiff, shorten } from './helpers.js';

Object.defineProperty(Object.prototype, 'getDiff', {
  enumerable: false,
  writable: true,
  value: getDiff,
});


Object.defineProperty(String.prototype, 'shorten', {
  enumerable: false,
  writable: false,
  value: shorten,
});

export default angular.module('haritasi.admin.core', [
    angularResource,
  ])
  .factory('Resource', ResourceService)
  .name;