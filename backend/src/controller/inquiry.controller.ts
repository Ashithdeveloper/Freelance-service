import { Request, Response } from "express";
import Inquiry from "../models/inquiry.model";

// 1. Submit Inquiry from Client (Public)
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      budget,
      timeline,
      message,
      features,
      estimatedPrice,
      estimatedDays,
      source,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required to submit an inquiry",
      });
    }

    const inquiry = await Inquiry.create({
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
  } catch (error: any) {
    console.error("Create Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to submit inquiry",
    });
  }
};

// 2. Get All Inquiries (Protected - Admin)
export const getAllInquiries = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;

    const filter: any = {};
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

    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();

    const stats = {
      total: await Inquiry.countDocuments(),
      new: await Inquiry.countDocuments({ status: "new" }),
      in_discussion: await Inquiry.countDocuments({ status: "in_discussion" }),
      completed: await Inquiry.countDocuments({ status: "completed" }),
    };

    return res.status(200).json({
      success: true,
      inquiries: inquiries || [],
      stats,
    });
  } catch (error: any) {
    console.error("Get Inquiries Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
    });
  }
};

// 3. Update Inquiry Status (Protected - Admin)
export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "in_discussion", "completed", "archived"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value provided",
      });
    }

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      inquiry: updated,
    });
  } catch (error: any) {
    console.error("Update Inquiry Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update inquiry status",
    });
  }
};

// 4. Delete Inquiry (Protected - Admin)
export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete Inquiry Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
    });
  }
};
