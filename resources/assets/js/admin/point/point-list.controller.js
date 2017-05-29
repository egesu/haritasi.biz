PointListController.$inject = [
    'Point',
    'usSpinnerService',
];

export default function PointListController(Point, usSpinnerService) {
    var vm = this;
    vm.list = [];
    vm.page = 0;
    vm.lastPageReached = false;

    vm.init = function() {
        vm.loadList();
    };

    vm.loadList = function() {
        let urlData = {
            page: vm.page,
        };

        usSpinnerService.spin('load-point-list');

        let promise = Point.query(urlData).$promise;

        promise
            .then(function success(response) {
                response.forEach((item) => {
                    vm.list.push(item);
                });
                if (response.length < 25) {
                    vm.lastPageReached = true;
                }
                usSpinnerService.stop('load-point-list');
            }).catch(function error() {
                usSpinnerService.stop('load-point-list');
            });
    };

    vm.loadMore = function() {
        vm.page++;
        vm.loadList();
    };

    vm.delete = function(point, index) {
        usSpinnerService.spin('load-point-list');

        Point.remove({ id: point.id }).$promise
            .then(() => {
                vm.list.splice(index, 1);
                usSpinnerService.stop('load-point-list');
            })
            .catch(() => {
                // @TODO show alert
                usSpinnerService.stop('load-point-list');
            });
    };

    vm.init();
}
