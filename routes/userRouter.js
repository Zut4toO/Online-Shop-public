// Step 1: create Model Schema
// Step 2: create Controller
// ---> Step 3: create Router - Forward HTTP Request to appropriate controller. basics: require Controller, router.post("/register", userCtrl.register); <---

// A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.),
// a URL path/pattern, and a function that is called to handle that pattern.

// Step 1: require('express').Router()
// Mit der Klasse express.Router lassen sich modular einbindbare Routenhandler erstellen. Eine Router-Instanz ist ein vollständiges Middleware- und Routingsystem
const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const authMinAdmin = require('../middleware/authMinAdmin');

// Step 2: create route: router.post / router.get(/abrufname, isLogged? isAdmin? ,get or post input from a Controller)
router.post('/register', userCtrl.register);

router.post('/activation', userCtrl.activateEmail);

router.post('/login', userCtrl.login);

router.get('/refresh_token', userCtrl.getAccessToken);

router.post('/forgot', userCtrl.forgotPassword);

router.post('/reset', auth, userCtrl.resetPassword);

router.get('/infor', auth, userCtrl.getUserInfor);

router.get('/all_infor', auth, authMinAdmin, userCtrl.getUsersAllInfor);

router.get('/alluserspage', auth, authMinAdmin, userCtrl.getAllUsersPage);

router.get('/logout', userCtrl.logout);

router.patch('/update', auth, userCtrl.updateUser);

router.patch('/update_role/:id', auth, authMinAdmin, userCtrl.updateUsersRole);

router.delete('/delete/:id', auth, authMinAdmin, userCtrl.deleteUser);

router.delete('/selfdelete/:id', auth, userCtrl.deleteYourSelf);

router.get('/history', auth, userCtrl.history);

// Step 3: module.exports = router;
module.exports = router;
