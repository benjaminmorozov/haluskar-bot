const mongoose = require("mongoose");

const ScoreSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    score: Number,
});

module.exports = mongoose.model("Score", ScoreSchema);
