const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
var session = require('express-session');

module.exports = function() {
  const hbs = exphbs.create({
    defaultLayout: `${__dirname}/views/layout`,
    handlebars,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs'
  });

  require('handlebars-helpers')({handlebars});

  const app = express();

  const defaultConfig = require(path.join(__dirname, 'config', 'index.json'));

  app.use(session({
    secret: defaultConfig.sessionSecret,
    cookie: {},
    resave: false,
    saveUninitialized: true
  }));

  const Queues = require('./queue');

  const queues = new Queues(defaultConfig);
  require('./views/helpers/handlebars')(handlebars, { queues });
  app.locals.Queues = queues;
  app.locals.appBasePath = '';
  app.locals.vendorPath = '/vendor';

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'hbs');
  app.set('json spaces', 2);

  app.engine('hbs', hbs.engine);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return {
    app,
    Queues: app.locals.Queues
  };
};
