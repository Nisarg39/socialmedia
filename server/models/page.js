const mongoose = require ('mongoose')

const pageSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String
    },
    categories: [{
        type: String
    }],
    mainCategory: {
        type: String,
        required: true
    },
    pagePic: {
        type: String
    },
    baner: {
        type: String
    },
    post: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }]

},{
    timestamps: true,
    toJSON: {virtuals: true}
})

const Page = mongoose.Schema("Page", pageSchema)
module.exports = Page;