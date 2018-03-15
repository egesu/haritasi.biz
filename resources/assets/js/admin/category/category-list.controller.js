CategoryListController.$inject = [
  '$uibModal',
  'Category',
];

export default function CategoryListController($uibModal, Category) {
  var vm = this;
  vm.list = [];

  vm.init = function() {
    vm.loadList();
  };

  vm.loadList = function() {
    vm.list = Category.query();

    vm.list.$promise
      .then(function success() {
        // console.log(response);
      }).catch(function error() {
        // console.log(response);
      });
  };

  vm.edit = function(category, index) {
    let modalInstance = $uibModal.open({
      template: require('../../../templates/admin/category-form.modal.html'),
      controller: 'CategoryModalController',
      controllerAs: 'category',
      size: 'lg',
      resolve: {
        itemId: function() {
          return category.id;
        },
      },
    });

    modalInstance.result.then((responseCategory) => {
      vm.list[index] = responseCategory;
    });
  };

  vm.delete = function(category, index) {
    Category.remove({ id: category.id }).$promise
      .then(() => {
        vm.list.splice(index, 1);
      })
      .catch((response) => {
        // @TODO show alert
        console.log(response);
      });
  };

  vm.add = function() {
    let modalInstance = $uibModal.open({
      template: require('../../../templates/admin/category-form.modal.html'),
      controller: 'CategoryModalController',
      controllerAs: 'category',
      size: 'lg',
      resolve: {
        itemId: null,
      },
    });

    modalInstance.result.then(() => {
      vm.loadList();
    });
  };

  vm.init();
}