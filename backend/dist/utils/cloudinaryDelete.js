"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = void 0;
const cloudinary_1 = require("../config/cloudinary");
const deleteFromCloudinary = async (public_id) => {
    return await cloudinary_1.cloudinary.uploader.destroy(public_id);
};
exports.deleteFromCloudinary = deleteFromCloudinary;
