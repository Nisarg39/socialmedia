const mongoose = require ('mongoose')

const commentSchema = new mongoose.Schema({
    mediaType: {
        type: String,
    },
    likes: {
        type: mongoose.Types.ObjectId
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }]
},{
    timestamps: true,
    toJSON: {virtuals: true}
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment