import angular from 'angular';

import core from '../core';

import CategoryListController from './category-list.controller';
import CategoryModalController from './category-modal.controller';
import Category from './category.service';
import CategoryStorage from './category-storage.service';

export default angular.module('haritasi.admin.category', [
    core,
  ])
  .controller('CategoryListController', CategoryListController)
  .controller('CategoryModalController', CategoryModalController)
  .factory('Category', Category)
  .service('CategoryStorage', CategoryStorage)
  .name;