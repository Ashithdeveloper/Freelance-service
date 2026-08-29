"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const webContactSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const WebContact = mongoose_1.default.models.WebContact || mongoose_1.default.model("WebContact", webContactSchema);
exports.default = WebContact;
