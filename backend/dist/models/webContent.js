"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const webContentSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const WebContent = mongoose_1.default.models.WebContent || mongoose_1.default.model("WebContent", webContentSchema);
exports.default = WebContent;
