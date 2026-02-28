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
  },
  { timestamps: true },
);

const WebContent =
  mongoose.models.WebContent || mongoose.model("WebContent", webContentSchema);

export default WebContent;
