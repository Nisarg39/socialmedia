const mongoose = require ('mongoose')

const storySchema = new mongoose.Schema({
    mediaType: {
        type: String,
        require: true
    },
},{
    toJSON: { virtuals: true },
    timestamps: true
})

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
