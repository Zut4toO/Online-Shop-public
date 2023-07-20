// ---> Step 1: create userModel Schema - exchanges data between DB and Controller. basics: const userSchema = new mongoose.Schema({})<---
// Step 2: create Controller
// Step 3: create Router

// Step 1: require mongoose
const mongoose = require('mongoose');

// In mongoose, a schema represents the structure of a particular document,
// can be completely or a portion of the document.
// It's a way to express expected properties and values as well as constraints and indexes.
// A model defines a programming interface for interacting with the database (read, insert, update, etc).

// Trim: It's basically there to ensure the strings you save through the schema are properly trimmed.
// "  hello ", would end up being saved as "hello" in Mongo - i.e. white spaces will be removed from both sides of the string.

// Step 2: create new mongoose.Schema Object
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Vorname'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Nachname'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      required: [true, 'Straße'],
      trim: true,
    },
    streetNumber: {
      type: String,
      required: [true, 'Hausnummer'],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, 'Postleitzahl'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Stadt'],
      trim: true,
    },
    telefon: {
      type: String,
      required: [true, 'Telefon'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Passwort'],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = Admin, 2 = Support, 3 = Master Admin
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Step 3: module.export (MongoDB Object Name, vewendete Schema)
module.exports = mongoose.model('Users', userSchema);
