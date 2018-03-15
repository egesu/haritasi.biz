export default class CategoryStorage {
  constructor($q, Category) {
    this.$q = $q;
    this.categoryResource = Category;
    this.categoryList = [];
    this.categoryObject = {};
    this.status = this.init();
  }

  init() {
    let deferred = this.$q.defer();

    this.categoryResource.query().$promise
      .then((response) => {
        this.categoryList = angular.copy(response);
        this.categoryList.forEach((category) => {
          this.categoryObject[category.id] = category;
        });
        deferred.resolve(this.categoryList);
      })
      .catch(() => {
        deferred.reject();
      });

    return deferred.promise;
  }

  getCategoryList() {
    return this.categoryList;
  }

  getCategory(id) {
    if (angular.isUndefined(this.categoryObject[id])) {
      return null;
    }
    return this.categoryObject[id];
  }
}

CategoryStorage.$inject = [
  '$q',
  'Category',
];