"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webcontent_controller_1 = require("../controller/webcontent.controller");
const inquiry_controller_1 = require("../controller/inquiry.controller");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
// ==========================================
// 1. PUBLIC ENDPOINTS (Client Portfolio)
// ==========================================
// Get all portfolio data (Hero, About, Services, Projects, Contact)
router.get("/getall", webcontent_controller_1.getWebContent);
// Client Contact Message & Quote Request Submission
router.post("/inquiry", inquiry_controller_1.createInquiry);
// ==========================================
// 2. PROTECTED ENDPOINTS (Admin Control Panel)
// ==========================================
// --- Inquiries & Leads Management ---
router.get("/inquiries", middleware_1.default, inquiry_controller_1.getAllInquiries);
router.put("/inquiry/:id", middleware_1.default, inquiry_controller_1.updateInquiryStatus);
router.delete("/inquiry/:id", middleware_1.default, inquiry_controller_1.deleteInquiry);
// --- Web Content (Hero & About) ---
router.post("/WebContent", middleware_1.default, webcontent_controller_1.webHeroSelection);
// --- Web Contact Details ---
router.post("/webContact", middleware_1.default, webcontent_controller_1.updateContact);
router.put("/updateContact", middleware_1.default, webcontent_controller_1.updateContact);
router.put("/updateContact/:id", middleware_1.default, webcontent_controller_1.updateContact);
// --- Services Management ---
router.post("/addService", middleware_1.default, webcontent_controller_1.addService);
router.put("/editService/:id", middleware_1.default, webcontent_controller_1.updateService);
router.put("/updateService/:id", middleware_1.default, webcontent_controller_1.updateService);
router.delete("/deleteService/:id", middleware_1.default, webcontent_controller_1.deleteService);
// --- Projects Management ---
router.post("/addProject", middleware_1.default, webcontent_controller_1.addProject);
router.put("/editProject/:id", middleware_1.default, webcontent_controller_1.updateProject);
router.delete("/deleteProject/:id", middleware_1.default, webcontent_controller_1.deleteProject);
exports.default = router;
