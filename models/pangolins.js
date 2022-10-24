const mongoose = require("mongoose");

const pangolinSchema = mongoose.Schema({
    token: String,
    email: String,
    name: String,
    password: String,
    hp: Number,
    roles: Array,
    types: Array,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "pangolins"}],
});

const pangolinModel = mongoose.model("pangolins", pangolinSchema);

module.exports = pangolinModel;