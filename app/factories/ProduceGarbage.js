export default function ProduceGarbage($http) {
    console.log('CREATE FACTORY INSTANCE');
    return {
        getRandomBooks: function () {
            return $http.get('/api/books')
        }
    }
}