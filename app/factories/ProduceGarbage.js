export default function ProduceGarbage($http, $log) {
    console.log('CREATE FACTORY INSTANCE');
    return {
        getRandomBooks: function () {
            $log.log('GETTING IT')
            return $http.get('/api/books')
        }
    }
}