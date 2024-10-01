const { default: mongoose } = require("mongoose");

const todolist_schema = mongoose.Schema({
  creator_id: {
    type: String,
    required: [true, "Id required"]
  },
  title: {
    type: String,
    required: [true, "Please add a title"]
  },
  description: {
    type: String,
    required: [true, "Please add a description"]
  },
  completed: {
    type: Boolean,
    required: [true, "Please add a completed val true/false"]
  },

}, {
  timestamp: true
});

module.exports = mongoose.model('Todolist', todolist_schema);