AppController.$inject = [
  '$state',
  'Auth',
];

export default function AppController($state, Auth) {
  var vm = this;

  vm.init = function() {
    Auth.check()
      .then(function() {
        //
      })
      .catch(function() {
        $state.go('login');
      });
  };

  vm.currentUser = function() {
    return Auth.currentUser;
  };

  vm.logout = function() {
    Auth.logout()
      .then(() => {
        $state.go('login');
      });
  };

  vm.init();
}