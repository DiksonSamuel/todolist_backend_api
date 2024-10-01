const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc register user
//@route GET /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  let { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    throw new Error('Complete all fields');
  }

  let userAvailable = await User.findOne({ email });
  if (userAvailable) {
    throw new Error('User already exist in the system');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    username,
    email,
    password: hashedPassword
  });
  res.status(200).json({ message: 'User registration successful' })
});

//@desc login user
//@route GET /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {

  let { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Complete all fields');
  }

  let user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    let accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id
        }
      },
      process.env.ACCESS_TOKEN_SECREAT,
      { expiresIn: '5m' }
    )

    res.status(200).json({accessToken, user})
  } else {
    throw new Error('Invalid credentials');
  }

});

module.exports = {
  registerUser,
  loginUser
}
