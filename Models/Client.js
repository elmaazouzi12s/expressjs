const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true, unique: true },
  prenom: { type: String, minLength: 5 },
  age: Number,
  password: String,
}, {collection: "clients"});
module.exports = mongoose.model("client", clientSchema);
