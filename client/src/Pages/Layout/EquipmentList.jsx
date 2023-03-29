const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
