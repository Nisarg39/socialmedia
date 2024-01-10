const mongoose = require ('mongoose')

const preferencesSchema = new mongoose.Schema({
    darkMode: {type: Boolean, default: true},
    showTimeline: {type: Boolean, default: false},

})

const Preferences = mongoose.model("Preferences", preferencesSchema);
module.exports = Preferences;