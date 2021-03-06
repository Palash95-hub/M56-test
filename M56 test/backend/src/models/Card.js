const mongoose = require("mongoose");
const validator = require("validator");

const cardSchema = new mongoose.Schema({
  CardNumber: {
    type: Number,
  },
  ExpiryDate: {
    type: Date,
  },
  CvvCode: {
    type: Number,
  },
  CardOwner: {
    type: String,
  },
});

const Card = new mongoose.model("Cards", cardSchema);

module.exports = Card;
