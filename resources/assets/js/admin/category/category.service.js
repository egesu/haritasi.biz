Category.$inject = [
    'Resource',
];

export default function Category(Resource) {
    var self = this;

    self.url = 'category/:id';

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
