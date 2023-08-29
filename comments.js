// create web server
// 1. create a web server
// 2. create a route (path) to the server
// 3. create a callback function to handle the route
// 4. start the server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var port = 3000;
var comments = [
  {
    name: 'John',
    comment: 'Hello World!'
  }
];

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('comments saved');
    }
  });
  res.json(comments);
});

app.listen(port, function() {
  console.log('server is running on port ' + port);
});