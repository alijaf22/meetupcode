
var express = require('express');
var fs = require('fs');

var server = express();

server.use(express.static(__dirname + '/public'));

server.get('/randomPeople', function(request, response) {
  var firstNames = JSON.parse(fs.readFileSync('data/first_names.json'));
  var lastNames = JSON.parse(fs.readFileSync('data/last_names.json'));
  var cities = JSON.parse(fs.readFileSync('data/cities.json'));

  var people = [];
  for (var i = 0; i < 200; i++) {
    var person = {
      firstName: firstNames[Math.floor(Math.random() * 50)],
      lastName: lastNames[Math.floor(Math.random() * 50)],
      city: cities[Math.floor(Math.random() * 50)]
    };

    people.push(person);
  }

  response.send(JSON.stringify(people));
});

server.listen(8080, 'localhost');

console.log('Server running on 8080');
