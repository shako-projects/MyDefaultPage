const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

// const path = require('path');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');


const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/price', (req, res) => {
    res.render('price')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'StatusCode 500, Something Went Wrong...'
    res.status(statusCode).render('error', { err })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
    console.log("Server listening on port " + port );
})
