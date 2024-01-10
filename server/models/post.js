const mongoose = require ('mongoose')

const postSchema = new mongoose.Schema({
    mediaLinks: [{
        type: String,
    }],

    captions: {
        type: String
    },

    likes: {
        type: mongoose.Types.ObjectId,
        ref: "Like"
    },

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    }],

    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true,
    toJSON: {virtuals: true}
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;