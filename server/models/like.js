const mongoose = require ('mongoose')

const likeSchema = new mongoose.Schema({
    userInfo: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    toJSON: { virtuals: true },
    timestamps: true
})

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;