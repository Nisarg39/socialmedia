const mongoose = require ('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    reciever: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    msgdate: {
        type: Date,
        default: Date.now,
    },
},{
    toJSON: { virtuals: true },
    timestamps: true
})

const Message= mongoose.Model("Message", messageSchema);

module.exports = Message;