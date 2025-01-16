const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      required: true,

      type: String,
      enum: {
        values: ["ignored", "interested", "rejected", "accepted"],
        message: `{VALUE} is an invalid status type`,
      },
    },
  },
  { timestamps: true }
);

//Optimses the database for searching using fromUserId and toUserId
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
