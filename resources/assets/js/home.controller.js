HomeController.$inject = [
    '$http',
];

export default function HomeController($http) {
    var vm = this;

    vm.markers = [];

    vm.init = function() {
        vm.loadPoints();
    };

    vm.loadPoints = function() {
        $http({
            method: 'get',
            url: '/api/points',
        }).then(
            function success(response) {
                console.log(response);
            },
            function error(response) {
                console.log(response);
            },
        );
    };

    vm.init();
}
