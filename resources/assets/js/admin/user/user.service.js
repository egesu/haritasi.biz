UserService.$inject = [
    'Resource',
];

export default function UserService(Resource) {
    var self = this;

    self.url = 'user/:id';

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
