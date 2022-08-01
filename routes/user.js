const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

/*
router.post = function (s, signup) {

}
*/
router.post('/register', userController.signup);
router.post('/login', userController.login);

module.exports = router;