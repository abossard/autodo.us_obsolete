const debug = require('debug');
const info = debug('server:info');
const error = debug('server:error');
const R = require('ramda');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error',
    apiVersion: '2.0'
});

client.ping({
    requestTimeout: 30000,
    hello: "elasticsearch"
}).then(()=> {
    info('nice')
}).catch(error)

const callElasticsearch = R.curry((client, method, index, data) => {
    return client[method](Object.assign({
        index
    }, data));
});

const typeBodyToData = function (type, body) {
    let id = body.id;
    return {type, body, id}
};
const typeToData = function (type) {
    return {type}
}

const resultToJson = R.map((item)=>(Object.assign({
    id: item._id,
    type: item._type
}, item._source)));

const getResults = function (result) {
    return result.hits.hits
}
const addModel = R.compose(
    callElasticsearch(client, 'index', 'autodo'),
    typeBodyToData
);

const searchModel = R.compose(callElasticsearch(client, 'search', 'autodo'), typeToData);

const addBook = addModel('book');
R.range(0, 1).forEach(()=> {
    addBook({
        title: 'Title'
    })
});
const trace = R.curry((name, value)=> {
    console.log(name, value)
    return value
})
const searchBook = searchModel('book');

console.log('RRRRRRRRRRRRRRRRRR:', searchBook.then(
    R.compose(trace('AFTER RESULT TO JSON'), resultToJson, trace('AFTER GET RESULTS'), getResults, trace('AFTER SEARCH BOOK'))
));

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
            return searchBook.then((r) => {
                    res.json(R.compose(resultToJson, getResults)(r))
                }
            )
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