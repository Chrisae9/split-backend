const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReceiptSchema = new Schema({
  _id: String,
  owner: String,
  name: String,
  items: [
    {
      _id: String,
      name: String,
      cost: Number,
      contributors: [{ uuid: String, name: String }],
      selected: Boolean,
    },
  ],
  contributors: [{ uuid: String, name: String }],
});

// Compile model from schema
const Receipt = mongoose.model("Receipt", ReceiptSchema);

module.exports = { Receipt };
