export default class LoginController {
  constructor(usSpinnerService, $state, Auth) {
    this.spinner = usSpinnerService;
    this.$state = $state;
    this.authService = Auth;
    this.data = {};
  }

  login() {
    this.authService.login(this.data)
      .then(() => {
        this.$state.go('admin.pointList');
      })
      .catch(() => {
        // @TODO show alert
        // console.log(response);
      });
  }
}

LoginController.$inject = [
  'usSpinnerService',
  '$state',
  'Auth',
];