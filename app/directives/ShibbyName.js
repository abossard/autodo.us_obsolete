export default function () {
    return {
        restrict: 'EA',
        scope: {},
        template: '<h1>{{ myVal }}</h1>',
        controller: function () {
        },
        link: function (scope, element, attrs) {
        },
    }
}