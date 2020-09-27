const mongoose = require("mongoose");

const WarnsSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    reason: String,
}, { timestamps: { createdAt: 'created_at'} });

module.exports = mongoose.model("Warns", WarnsSchema);
