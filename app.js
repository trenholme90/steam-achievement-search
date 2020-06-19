//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('mongoose');
const reload = require('reload')
const sassMiddleware = require('node-sass-middleware');
const Handlebars = require('handlebars')

const Router = require('./routes');

const app = express();

// Only use env variables if not production
if(process.env.NODE_ENV != 'production' ) {
    require('dotenv').config()
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Handlebars.registerPartial(path.join(__dirname, 'views/partials/list'), '{{prefix}}');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/stylesheets'),
    dest: path.join(__dirname, 'public/dist'),
    indentedSyntax: false, // true = .sass and false = .scss
    debug: true,
    outputStyle: 'compressed',  
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public/dist')));

try {
    db.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('DB connected')
} catch (error) {
    console.log(error)
}

// Reload code here
reload(app).then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README
    app.use(Router);
}).catch(function (err) {
    console.error('Reload could not start, could not start server/sample app', err)
})

module.exports = app;
