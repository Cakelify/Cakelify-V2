// models/Message.js
// const mongoose = require('mongoose');
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  email: String,
  address: String,
  age: Number,
  qualification: String,
  about: String,
  language: String,
});

// module.exports = mongoose.model("Message", messageSchema);

export default mongoose.model("Message", messageSchema);
