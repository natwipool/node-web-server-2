const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toDateString();
  var log = `${now}: ${req.method} - ${req.path}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append log to the server.');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send({
  //   name: 'natwipool',
  //   age: 25
  // });
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome to my second hbs template page'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  });
})

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});