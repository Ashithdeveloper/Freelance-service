"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInquiry = exports.updateInquiryStatus = exports.getAllInquiries = exports.createInquiry = void 0;
const inquiry_model_1 = __importDefault(require("../models/inquiry.model"));
// 1. Submit Inquiry from Client (Public)
const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, serviceType, budget, timeline, message, features, estimatedPrice, estimatedDays, source, } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required to submit an inquiry",
            });
        }
        const inquiry = await inquiry_model_1.default.create({
            name,
            email,
            phone: phone || "",
            serviceType: serviceType || "Web Application",
            budget: budget || "",
            timeline: timeline || "",
            message: message || "",
            features: Array.isArray(features) ? features : [],
            estimatedPrice: Number(estimatedPrice) || 0,
            estimatedDays: Number(estimatedDays) || 0,
            source: source || "contact_form",
            status: "new",
        });
        return res.status(201).json({
            success: true,
            message: "Inquiry received successfully! Ashith will get in touch shortly.",
            inquiry,
        });
    }
    catch (error) {
        console.error("Create Inquiry Error:", error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Failed to submit inquiry",
        });
    }
};
exports.createInquiry = createInquiry;
// 2. Get All Inquiries (Protected - Admin)
const getAllInquiries = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};
        if (status && status !== "all") {
            filter.status = status;
        }
        if (search && typeof search === "string" && search.trim()) {
            const q = search.trim();
            filter.$or = [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { serviceType: { $regex: q, $options: "i" } },
                { message: { $regex: q, $options: "i" } },
            ];
        }
        const inquiries = await inquiry_model_1.default.find(filter).sort({ createdAt: -1 }).lean();
        const stats = {
            total: await inquiry_model_1.default.countDocuments(),
            new: await inquiry_model_1.default.countDocuments({ status: "new" }),
            in_discussion: await inquiry_model_1.default.countDocuments({ status: "in_discussion" }),
            completed: await inquiry_model_1.default.countDocuments({ status: "completed" }),
        };
        return res.status(200).json({
            success: true,
            inquiries: inquiries || [],
            stats,
        });
    }
    catch (error) {
        console.error("Get Inquiries Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries",
        });
    }
};
exports.getAllInquiries = getAllInquiries;
// 3. Update Inquiry Status (Protected - Admin)
const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["new", "in_discussion", "completed", "archived"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status value provided",
            });
        }
        const updated = await inquiry_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.status(200).json({
            success: true,
            message: `Inquiry status updated to ${status}`,
            inquiry: updated,
        });
    }
    catch (error) {
        console.error("Update Inquiry Status Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update inquiry status",
        });
    }
};
exports.updateInquiryStatus = updateInquiryStatus;
// 4. Delete Inquiry (Protected - Admin)
const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await inquiry_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully",
        });
    }
    catch (error) {
        console.error("Delete Inquiry Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete inquiry",
        });
    }
};
exports.deleteInquiry = deleteInquiry;
