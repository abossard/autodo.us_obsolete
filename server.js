var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
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
    client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,

        // undocumented params are appended to the query string
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            console.trace('elasticsearch cluster is down!');
        } else {
            console.log('All is well');
        }
    });
    switch (req.params.model) {
        case 'book':
        case 'books':
            return res.json([{name: 'REAL', id: 1}, {name: 'UNREAL', id: 2}])
        default:
            return res.json({})
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