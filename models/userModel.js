const { default: mongoose } = require("mongoose");

const user_schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  username: {
    type: String,
    required: [true, "Please add a username"]
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: [true, "EmailId already present in the system"]
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },

}, {
  timestamp: true
});

module.exports = mongoose.model('user', user_schema);