AppRoutes.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];

export default function AppRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
      url: '',
      views: {
        mainView: {
          template: require('../../templates/website/layout.html'),
          controller: 'HomeController',
          controllerAs: 'home',
        },
      },
    });

  $urlRouterProvider.otherwise('/');
}