import mongoose from "mongoose";

const webContentSchema = new mongoose.Schema(
  {
    heroSection: [
      {
        content: String,
        image: String,
      },
    ],

    aboutSection: [
      {
        heading: String,
        content: String,
      },
    ],

    contactSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WebContact",
    },

    serviceSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    projectSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectPhoto",
      },
    ],
  },
  { timestamps: true },
);

const WebContent =
  mongoose.models.WebContent || mongoose.model("WebContent", webContentSchema);

export default WebContent;
