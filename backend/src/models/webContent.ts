import mongoose from "mongoose";

const webContentSchema = new mongoose.Schema(
  {
    heroSection: {
      title: {
        type: String,
        required: true,
      },
      images: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
    },

    aboutSection: {
      aboutTitle: {
        type: String,
        required: true,
      },
      aboutDescription: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const WebContent =
  mongoose.models.WebContent || mongoose.model("WebContent", webContentSchema);

export default WebContent;
