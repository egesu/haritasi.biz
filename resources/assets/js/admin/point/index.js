import angular from 'angular';

import core from '../core';

import PointListController from './point-list.controller';
import PointController from './point.controller';
import Point from './point.service';

export default angular.module('haritasi.admin.point', [
    core,
  ])
  .controller('PointListController', PointListController)
  .controller('PointController', PointController)
  .factory('Point', Point)
  .name;