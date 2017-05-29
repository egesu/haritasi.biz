export default class PointController {
    constructor($scope, $state, usSpinnerService, Point, CategoryStorage) {
        this.$scope = $scope;
        this.$state = $state;
        this.spinner = usSpinnerService;
        this.pointResource = Point;
        this.categoryStorage = CategoryStorage;
        this.pointId = this.$state.params.pointId || null;
        this.dirtyData = {};
        this.cleanData = {};
        this.mapEvents = {
            map: {
                enable: [
                    'click',
                ],
                logic: 'broadcast',
            },
        };

        this.markers = [];

        this.init();
    }

    init() {
        if (this.pointId === null) {
            this.dirtyData.links = [null];
        } else {
            this.loadPoint();
        }

        this.$scope.$on('leafletDirectiveMap.click', (event, leaflet) => {
            this.mapClicked(leaflet);
        });

        this.$scope.$watch('point.markers[0].lat', (newLat) => this.dirtyData.latitude = newLat);
        this.$scope.$watch('point.markers[0].lng', (newLng) => this.dirtyData.longitude = newLng);
    }

    loadPoint() {
        this.spinner.spin('point');
        this.pointResource.get({ id: this.pointId }).$promise
            .then((success) => {
                this.cleanData = success;
                this.dirtyData = angular.copy(this.cleanData);

                this.markers[0] = {
                    lat: this.dirtyData.latitude,
                    lng: this.dirtyData.longitude,
                    draggable: true,
                };
                this.spinner.stop('point');
            })
            .catch(() => {
                this.spinner.stop('point');
            });
    }

    save() {
        let data = this.dirtyData.getDiff(this.cleanData),
            point;

        if (angular.equals(data, {})) {
            // nothing to save
            return;
        }

        this.spinner.spin('point');

        if (this.pointId) {
            point = this.pointResource.update({ id: this.pointId }, data);
        } else {
            point = this.pointResource.insert(data);
        }

        point.$promise
            .then(() => {
                this.cleanData = angular.copy(this.dirtyData);
                this.spinner.stop('point');
            })
            .catch(() => {
                this.spinner.stop('point');
            });
    }

    mapClicked(leaflet) {
        this.markers[0] = {
            lat: leaflet.leafletEvent.latlng.lat,
            lng: leaflet.leafletEvent.latlng.lng,
            draggable: true,
        };

        this.setPointCoordinates(leaflet.leafletEvent.latlng.lat, leaflet.leafletEvent.latlng.lng);
    }

    setPointCoordinates(lat, lng) {
        this.dirtyData.latitude = lat || this.dirtyData.latitude;
        this.dirtyData.longitude = lng || this.dirtyData.longitude;
    }

    categoryList() {
        return this.categoryStorage.getCategoryList();
    }
}

PointController.$inject = [
    '$scope',
    '$state',
    'usSpinnerService',
    'Point',
    'CategoryStorage',
];
