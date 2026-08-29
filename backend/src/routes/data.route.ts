import express from "express";
import {
  addProject,
  addService,
  deleteProject,
  deleteService,
  getWebContent,
  updateContact,
  updateProject,
  updateService,
  webHeroSelection,
} from "../controller/webcontent.controller";
import {
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controller/inquiry.controller";
import authMiddleware from "../middleware/middleware";

const router = express.Router();

// ==========================================
// 1. PUBLIC ENDPOINTS (Client Portfolio)
// ==========================================
// Get all portfolio data (Hero, About, Services, Projects, Contact)
router.get("/getall", getWebContent);

// Client Contact Message & Quote Request Submission
router.post("/inquiry", createInquiry);

// ==========================================
// 2. PROTECTED ENDPOINTS (Admin Control Panel)
// ==========================================

// --- Inquiries & Leads Management ---
router.get("/inquiries", authMiddleware, getAllInquiries);
router.put("/inquiry/:id", authMiddleware, updateInquiryStatus);
router.delete("/inquiry/:id", authMiddleware, deleteInquiry);

// --- Web Content (Hero & About) ---
router.post("/WebContent", authMiddleware, webHeroSelection);

// --- Web Contact Details ---
router.post("/webContact", authMiddleware, updateContact);
router.put("/updateContact", authMiddleware, updateContact);
router.put("/updateContact/:id", authMiddleware, updateContact);

// --- Services Management ---
router.post("/addService", authMiddleware, addService);
router.put("/editService/:id", authMiddleware, updateService);
router.put("/updateService/:id", authMiddleware, updateService);
router.delete("/deleteService/:id", authMiddleware, deleteService);

// --- Projects Management ---
router.post("/addProject", authMiddleware, addProject);
router.put("/editProject/:id", authMiddleware, updateProject);
router.delete("/deleteProject/:id", authMiddleware, deleteProject);

export default router;