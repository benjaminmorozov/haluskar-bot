const mongoose = require("mongoose");

const VerifySchema = mongoose.Schema({
    userID: String,
    serverID: String,
    verify: Boolean,
});

module.exports = mongoose.model("Verify", VerifySchema);
