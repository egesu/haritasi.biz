import angular from 'angular';

import HomeController from './home.controller';

export default angular.module('haritasi.web.home', [])
    .controller('HomeController', HomeController)
    .name;
