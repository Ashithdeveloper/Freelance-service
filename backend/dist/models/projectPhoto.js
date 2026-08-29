"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectPhotoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    techStack: [String], // ["React", "Node", "MongoDB"]
    images: [
        {
            url: { type: String },
            public_id: { type: String },
        },
    ],
    liveLink: String,
    githubLink: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const ProjectPhoto = mongoose_1.default.models.ProjectPhoto ||
    mongoose_1.default.model("ProjectPhoto", projectPhotoSchema);
exports.default = ProjectPhoto;
