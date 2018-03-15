import angular from 'angular';

import core from '../../admin/core';

import Point from '../../admin/point/point.service';

export default angular.module('haritasi.point', [
    core,
  ])
  .factory('Point', Point)
  .name;