export default class HomeController {
  constructor($scope, usSpinnerService, leafletData, Point, CategoryStorage) {
    this.$scope = $scope;
    this.spinner = usSpinnerService;
    this.pointResource = Point;
    this.leafletData = leafletData;
    this.categoryStorage = CategoryStorage;
    this.selectedCategories = [];

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
      minZoom: 3,
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
          'overlayadd',
          'overlayremove',
          'zoomend',
        ],
        logic: 'emit',
      },
    };

    this.init();
  }

  init() {
    this.$scope.$on('leafletDirectiveMap.map.dragend', (e, l) => this.handleReloadPoints(e, l.leafletObject));
    // this.$scope.$on('leafletDirectiveMap.map.overlayadd', (e, l, a, b) => this.testing(e, l.leafletObject, a, b));
    // this.$scope.$on('leafletDirectiveMap.map.overlayremove', (e, l, a, b) => this.testing(e, l.leafletObject, a, b));
    this.$scope.$on('leafletDirectiveMap.map.zoomend', (e, l) => this.handleReloadPoints(e, l.leafletObject));

    this.spinner.spin('load-categories');

    this.categoryStorage.status.then((categoryList) => {
      this.categoryList = categoryList;
      for (let i = 0; i <= 3; i++) {
        if (this.categoryList[i]) {
          this.categoryList[i].selected = true;
          this.selectedCategories.push(this.categoryList[i].id);
        }
      }

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

      this.spinner.stop('load-categories');
    });
  }

  toggleCategory(category) {
    category.selected = !category.selected;
    let length = this.categoryList.length;
    let selectedCategories = [];

    for (let i = 0; i < length; i++) {
      if (this.categoryList[i].selected) {
        selectedCategories.push(this.categoryList[i].id);
      }
    }

    this.selectedCategories = selectedCategories;

    this.leafletData.getMap('map').then((map) => {
      this.handleReloadPoints(null, map);
    });
  }

  handleReloadPoints(event, map) {
    console.log(event);
    let bounds = map.getBounds();
    this.loadPoints({
      latitudeMin: bounds._southWest.lat,
      latitudeMax: bounds._northEast.lat,
      longitudeMin: bounds._southWest.lng,
      longitudeMax: bounds._northEast.lng,
      'categoryIds[]': this.selectedCategories,
    });
  }

  loadPoints(bounds) {
    this.spinner.spin('load-points');
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
      })
      .finally(() => {
        this.spinner.stop('load-points');
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