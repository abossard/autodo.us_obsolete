export default function () {
    return {
        scope: {
            title: '@',
            action: '&'
        },
        template: '<h1 ng-click="action()">AAA {{ title }}</h1>',
        link: function (scope, element, attrs) {
        }
    }
}