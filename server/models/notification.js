const mongoose = require ('mongoose')

const notificationSchema = new mongoose.Schema({
    to: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    from: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },

    notificationType: {
      type: String,
      enum: ["friendrequest", "comment", "friendrequestaccepted"],
    },

    content: {
      type: String,
    }

  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  },
);

const Notification =  mongoose.model("Notification", notificationSchema);
module.exports = Notification;
