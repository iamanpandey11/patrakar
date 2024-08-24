const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  country: {
    type: String,
  },
  preferredLanguage: {
    type: String,
    enum: ["English", "Spanish", "French", "Other"],
  },
  address: {
    type: String,
  },
  postalAddress: {
    type: String,
  },
  whatsappNumber: {
    type: String,
    unique: true,
  },
  adharNumber: {
    type: String,
    unique: true,
  },
  termsAndConditions: {
    type: Boolean,
  },
  created_at:
  {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

// now we need to create a collection

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

