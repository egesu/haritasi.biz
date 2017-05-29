export default class HomeController {
    constructor($scope, usSpinnerService, leafletData, Point, CategoryStorage) {
        this.$scope = $scope;
        this.spinner = usSpinnerService;
        this.pointResource = Point;
        this.leafletData = leafletData;
        this.categoryStorage = CategoryStorage;

        this.pointList = [];
        this.categoryMarkerTypes = {};
        this.layers = {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                points: {
                    name: 'points',
                    type: 'markercluster',
                    visible: true,
                },
            },
        };

        this.mapConfig = {
            minZoom: 7,
        };

        this.mapCenter = {
            zoom: 7,
            lat: 39,
            lng: 36,
        };

        this.mapEvents = {
            map: {
                enable: [
                    'dragend',
                ],
                logic: 'emit',
            },
        };

        this.init();
    }

    init() {
        this.$scope.$on('leafletDirectiveMap.map.dragend', (e, l) => this.handleReloadPoints(e, l.leafletObject));
        // this.$scope.$on('leafletDirectiveMap.map.resize', (e, l) => this.handleReloadPoints(e, l.leafletObject));

        this.categoryStorage.status.then((categoryList) => {
            categoryList.forEach((category) => {
                this.layers.overlays['category-' + category.id] = {
                    name: category.name,
                    type: 'markercluster',
                    visible: true,
                };

                this.categoryMarkerTypes['category-' + category.id] = {
                    type: 'vectorMarker',
                    prefix: 'glyphicon',
                    icon: category.icon || 'asterisk',
                    markerColor: category.color_code,
                };
            });

            this.leafletData.getMap('map').then((map) => {
                this.handleReloadPoints(null, map);
            });

            this.showMap = true;
        });
    }

    handleReloadPoints(event, map) {
        let bounds = map.getBounds();
        this.loadPoints({
            latitudeMin: bounds._southWest.lat,
            latitudeMax: bounds._northEast.lat,
            longitudeMin: bounds._southWest.lng,
            longitudeMax: bounds._northEast.lng,
        });
    }

    loadPoints(bounds) {
        bounds.listType = 'bounded';
        this.pointResource.query(bounds).$promise
            .then((results) => {
                let newPointList = [];
                results.forEach((item) => {
                    newPointList.push({
                        lat: item.latitude,
                        lng: item.longitude,
                        layer: 'category-' + item.category_id,
                        // layer: 'points',
                        message: item.title,
                        icon: this.categoryMarkerTypes['category-' + item.category_id],
                    });
                });
                this.pointList = newPointList;
            });
    }
}

HomeController.$inject = [
    '$scope',
    'usSpinnerService',
    'leafletData',
    'Point',
    'CategoryStorage',
];
