var connect = require('connect');
var ngApimock = require('ng-apimock')();
var http = require('http');

ngApimock.run({
  "baseUrl": "http://localhost:4300", // If not informed browser.baseUrl will be used
  "src": "test/mocks",
  "outputDir": "build/mocks",
  "done": function() {
  // async
  }
});

ngApimock.watch("test/mocks");

var app = connect();
app.use('/mocking', require('serve-static')('build/mocks/'));
app.use(require('ng-apimock/lib/utils').ngApimockRequest);
app.use(function middleware2(req, res, next) {
  // middleware 2
  next();
});

http.createServer(app).listen(4300);
