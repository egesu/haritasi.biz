export default class CategoryModalController {
    constructor($uibModalInstance, Category, itemId) {
        this.$uibModalInstance = $uibModalInstance;
        this.categoryService = Category;
        this.itemId = itemId;

        this.init();
    }

    init() {
        this.cleanData = this.categoryService.get({ id: this.itemId });

        this.cleanData.$promise.then(
            (response) => {
                this.dirtyData = angular.copy(response);
            },
            () => {
                // show alert
            }
        );
    };

    save() {
        let data = this.dirtyData.getDiff(this.cleanData),
            category;

        if (angular.equals(data, {})) {
            // nothing to save
            return;
        }

        if (this.itemId) {
            category = this.categoryService.update({ id: this.itemId }, data);
        } else {
            category = this.categoryService.insert(data);
        }

        category.$promise
            .then(() => {
                this.cleanData = angular.copy(this.dirtyData);
                this.closeModal();
            })
            .catch((response) => {
                console.log(response);
            });
    };

    closeModal() {
        console.log(angular.copy(this.cleanData));
        this.$uibModalInstance.close(angular.copy(this.cleanData));
    };

    dismissModal() {
        this.$uibModalInstance.dismiss('cancel');
    };
}

CategoryModalController.$inject = [
    '$uibModalInstance',
    'Category',
    'itemId',
];
