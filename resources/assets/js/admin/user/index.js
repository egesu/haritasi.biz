import angular from 'angular';

import core from '../core';
import LoginController from './login.controller';
import AuthService from './auth.service';
import UserService from './user.service.js';

export default angular.module('haritasi.admin.user', [
    core,
  ])
  .controller('LoginController', LoginController)
  .service('Auth', AuthService)
  .factory('User', UserService)
  .name;