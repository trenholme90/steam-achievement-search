const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController')
const searchController = require('../controllers/SearchController')

router.get('/status', (req, res) => { res.send({status: 200}); });

// Home Page
router.get('/', function(req, res, next) { res.render('index', { title: 'Welcome to Steam Search' });});

// Register User
router.get('/user/register', function(req, res, next) { res.render('register', { title: 'Register' }) });
router.post('/user/register', userController.createUser)

// Login User
router.get('/user/login', function(req, res, next) { res.render('login', { title: 'Login' }) });
router.post('/user/login', userController.loginUser)

// Dashboard
router.get('/dashboard', searchController.getGameData)
router.get('/dashboard/:id', searchController.getGameData)
router.post('/dashboard', searchController.sendToGamePage)


module.exports = router;
