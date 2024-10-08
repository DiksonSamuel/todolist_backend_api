const express = require('express');
const { registerUser, loginUser, getUserActivity } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);
router.route("/activity").get(validateToken, getUserActivity);

module.exports = router;