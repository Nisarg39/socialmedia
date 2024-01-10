const mongoose = require ('mongoose')

const reportSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    victim: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true}
})

const Report =  mongoose.model("Report", reportSchema);
module.exports = Report