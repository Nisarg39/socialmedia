const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male" , "female"]
    },
    dob: {
        type: Number,
        // required: true
    },
    profilepic: {
        type: String,
    },
    phone_no: {
        type: Number
    },
    realtionship_status: {
        type: String,
        enum: ["single", "commited", "married"]
    },
    about: {
        type: String
    },
    notifications: [{
        type: mongoose.Types.ObjectId,
        ref: "Notification" 
    }],
    stories: [{
        type: mongoose.Types.ObjectId,
        ref: "Story"
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message"
    }],
    wall: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }],
    feed: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }],
    suggestedFeed: [{
        type: mongoose.Types.ObjectId,
        ref: "Post"
    }],
    blockList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    preferences: {
        type: mongoose.Types.ObjectId,
        ref: "Preferences"
    },
    flags: [{
        type: String,
    }],
    reports: [{
        type: mongoose.Types.ObjectId,
        ref: "Report"
    }],
    pages: [{
        type: mongoose.Types.ObjectId,
        ref: "Page"
    }],
    pagesSubscribed: [{
        type: mongoose.Types.ObjectId,
        ref: "Page"
    }],
    followedList: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
    }],
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    friendRequest: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        unique: true,
    }]

}, {
    toJSON: { virtuals: true },
    timestamps: true
});

const User = mongoose.model('User', usersSchema);
module.exports  = User;