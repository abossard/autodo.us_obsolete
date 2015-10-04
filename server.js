var express = require('express')
var app = express()
app.set('view engine', 'jade');
app.use(require('connect-livereload')({
    port: 35729
}));
app.use('/static', express.static('public'))
app.get('/views/:viewName', function (req, res) {
    res.render(req.params.viewName, {title: 'Hey', message: 'Hello there!'});
});
app.get('/api/:model', function (req, res) {
    switch (req.params.model) {
        case 'book':
        case 'books':
            res.send([{name: 'REAL', id: 1}, {name: 'UNREAL', id: 2}])
        default:
            res.send({})
    }
})
app.get('/', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});