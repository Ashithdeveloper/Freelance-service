import mongoose from "mongoose";

const webContactSchema = new mongoose.Schema(
  {
    phoneNumbers: [
      {
        label: { type: String, default: "Office" }, // Office, Support, WhatsApp
        number: { type: String, required: true },
      },
    ],

    emails: [
      {
        label: { type: String, default: "Support" }, // Support, Info, Careers
        email: { type: String, required: true },
      },
    ],

    address: {
      type: String,
      required: true,
    },

    socialMedia: {
      instagram: String,
      linkedin: String,
      twitter: String,
      facebook: String,
      youtube: String,
    },

    mapLink: String,
  },
  { timestamps: true },
);

const WebContact = mongoose.models.WebContact || mongoose.model("WebContact", webContactSchema);

export default WebContact;
