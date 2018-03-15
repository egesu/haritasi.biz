AdminRoutes.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];

export default function AdminRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        mainView: {
          template: require('../../templates/admin/login.html'),
          controller: 'LoginController',
          controllerAs: 'login',
        },
      },
    })

    .state('admin', {
      url: '',
      views: {
        mainView: {
          template: require('../../templates/admin/layout.html'),
          // controller: 'AppController',
          // controllerAs: 'app',
        },
      },
    })

    .state('admin.home', {
      url: '/home',
      views: {
        content: {
          template: require('../../templates/admin/dashboard.html'),
          // controller: 'AppController',
          // controllerAs: 'app',
        },
      },
    })

    .state('admin.categories', {
      url: '/categories',
      views: {
        content: {
          template: require('../../templates/admin/category-list.html'),
          controller: 'CategoryListController',
          controllerAs: 'categoryList',
        },
      },
    })

    .state('admin.pointList', {
      url: '/points',
      views: {
        content: {
          template: require('../../templates/admin/point-list.html'),
          controller: 'PointListController',
          controllerAs: 'pointList',
        },
      },
    })

    .state('admin.pointForm', {
      url: '/points/:pointId',
      views: {
        content: {
          template: require('../../templates/admin/point-form.html'),
          controller: 'PointController',
          controllerAs: 'point',
        },
      },
      params: {
        pointId: null,
      }
    });

  $urlRouterProvider.otherwise('/login');
}