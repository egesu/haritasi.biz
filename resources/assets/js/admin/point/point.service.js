Point.$inject = [
    'Resource',
];

export default function Point(Resource) {
    var self = this;

    self.url = 'point/:id';

    self.resourceService = Resource(
        self.url, {
            id: '@id',
        }, {
            query: {
                method: 'GET',
                isArray: true
            },
            get: {
                method: 'GET',
            },
            insert: {
                method: 'POST',
            },
            update: {
                method: 'PUT',
            },
            remove: {
                method: 'DELETE',
            },
        }
    );

    return self.resourceService;
}
