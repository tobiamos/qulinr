const mongoose = require('mongoose');
const foodTypes = ['breakfast', 'lunch', 'dinner'];
const menuSchema = new mongoose.Schema({
  foodMenu: { type: String, required: 'Please provide a food name' },
  foodType: { type: String, enum: foodTypes, required: 'Please provide a food type' },
  timeEstimate: { type: String, required: 'Please provide a time estimate'},
  token: { type: String, required: 'Please provide a token' }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);