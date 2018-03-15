export default class AuthService {
  constructor($q, Resource, User) {
    this.$q = $q;
    this.currentUser = undefined;
    this.userResource = User;
    this.authResource = Resource(
      'auth/:id', {
        id: '@id',
      }, {
        query: {
          method: 'GET',
          isArray: false,
        },
        insert: {
          method: 'POST',
        },
        remove: {
          method: 'DELETE',
        },
      }
    );

    this.categoryList = [];
    this.init();
  }

  init() {
    //
  }

  login(params) {
    let deferred = this.$q.defer();

    this.authResource.insert(params).$promise
      .then((user) => {
        this.currentUser = user;
        deferred.resolve(user);
      })
      .catch(() => {
        deferred.reject();
      });

    return deferred.promise;
  }

  logout() {
    let deferred = this.$q.defer();

    this.authResource.delete().$promise
      .then(() => {
        this.currentUser = null;
        deferred.resolve();
      })
      .catch(() => {
        deferred.reject();
      });

    return deferred.promise;
  }

  check() {
    let deferred = this.$q.defer();

    this.authResource.query().$promise
      .then((user) => {
        this.currentUser = user;
        deferred.resolve(user);
      })
      .catch(() => {
        deferred.reject();
      });

    return deferred.promise;
  }
}

AuthService.$inject = [
  '$q',
  'Resource',
  'User',
];