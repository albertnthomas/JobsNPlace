const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  candidateName:{type: String, required: true},
  mobile:{type: Number, required: true},
  experience:{type: String, required: true},
  technology:{type: String, required: true},

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
