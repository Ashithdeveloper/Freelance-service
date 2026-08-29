"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHeroSelection = exports.updateProject = exports.deleteProject = exports.addProject = exports.deleteService = exports.addService = exports.updateService = exports.updateContact = exports.getWebContent = void 0;
const webContent_1 = __importDefault(require("../models/webContent"));
const contactsection_1 = __importDefault(require("../models/contactsection"));
const serviceAvailable_1 = __importDefault(require("../models/serviceAvailable"));
const projectPhoto_1 = __importDefault(require("../models/projectPhoto"));
const cloudinaryDelete_1 = require("../utils/cloudinaryDelete");
const getWebContent = async (req, res) => {
    try {
        const [webContent, webContact, services, projects] = await Promise.all([
            webContent_1.default.findOne().lean(),
            contactsection_1.default.findOne().lean(),
            serviceAvailable_1.default.find().lean(),
            projectPhoto_1.default.find().lean(),
        ]);
        return res.status(200).json({
            webContent,
            webContact,
            services: services || [],
            projects: projects || [],
            message: "Web content fetched successfully",
        });
    }
    catch (error) {
        console.error("Get Web Content Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.getWebContent = getWebContent;
// update the web contact
const updateContact = async (req, res) => {
    try {
        const contact = req.body;
        const updatedContact = await contactsection_1.default.findOneAndUpdate({}, contact, {
            new: true,
            runValidators: true,
        });
        if (!updatedContact) {
            const webContact = await contactsection_1.default.create(contact);
            return res.status(201).json({
                message: "Contact created successfully",
                webContact,
            });
        }
        return res.status(200).json({
            message: "Contact updated successfully",
            updatedContact,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateContact = updateContact;
//update service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await serviceAvailable_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({
            message: "Service updated successfully",
            updatedService,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateService = updateService;
//Add new service
const addService = async (req, res) => {
    try {
        const service = req.body;
        if (!service)
            return res.status(400).json({ message: "Service is required" });
        const createService = await serviceAvailable_1.default.create(service);
        return res.status(201).json({
            message: "Service added successfully",
            createService,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addService = addService;
//Delete service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await serviceAvailable_1.default.findByIdAndDelete(id);
        return res.json({ message: "Service deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteService = deleteService;
//ProjectPoto upload
const addProject = async (req, res) => {
    try {
        const { title, description, techStack, images, liveLink, githubLink, amount, isActive, } = req.body;
        // Parse techStack back to array
        const parsedTechStack = Array.isArray(techStack)
            ? techStack
            : typeof techStack === "string"
                ? techStack.split(",").map((tech) => tech.trim())
                : [];
        const parsedImages = Array.isArray(images)
            ? images
            : images
                ? [images]
                : [];
        if (!title || !description || !parsedTechStack || !isActive || !images)
            return res.status(400).json({ message: "Project is required" });
        const createProject = await projectPhoto_1.default.create({
            title,
            description,
            techStack: parsedTechStack,
            liveLink,
            images: parsedImages,
            githubLink,
            amount,
            isActive,
        });
        if (!createProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(201).json({
            message: "Project added successfully",
            project: createProject,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addProject = addProject;
//delete project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        const existingProject = await projectPhoto_1.default.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (existingProject.images.length > 0) {
            await Promise.all(existingProject.images.map((img) => (0, cloudinaryDelete_1.deleteFromCloudinary)(img.public_id)));
        }
        const project = await projectPhoto_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteProject = deleteProject;
//Project Edit
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }
        const { title, description, techStack, images, liveLink, githubLink, amount, isActive, } = req.body;
        const existingProject = await projectPhoto_1.default.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (existingProject.images.length > 0) {
            await Promise.all(existingProject.images.map((img) => (0, cloudinaryDelete_1.deleteFromCloudinary)(img.public_id)));
        }
        const parsedTechStack = Array.isArray(techStack)
            ? techStack
            : typeof techStack === "string"
                ? techStack.split(",").map((tech) => tech.trim())
                : [];
        // ✅ Normalize images
        const parsedImages = Array.isArray(images)
            ? images
            : images
                ? [images]
                : [];
        const updateData = {};
        if (title)
            updateData.title = title;
        if (description)
            updateData.description = description;
        if (techStack)
            updateData.techStack = parsedTechStack;
        if (images)
            updateData.images = parsedImages;
        if (liveLink)
            updateData.liveLink = liveLink;
        if (githubLink)
            updateData.githubLink = githubLink;
        if (amount)
            updateData.amount = amount;
        if (typeof isActive === "boolean")
            updateData.isActive = isActive;
        const updatedProject = await projectPhoto_1.default.findByIdAndUpdate(id, updateData, { new: true });
        return res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateProject = updateProject;
const webHeroSelection = async (req, res) => {
    try {
        const { title, aboutTitle, aboutDescription, images } = req.body;
        if (!title || !aboutTitle || !aboutDescription) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        let webContent = await webContent_1.default.findOne({});
        // CREATE FIRST TIME
        if (!webContent) {
            webContent = await webContent_1.default.create({
                heroSection: {
                    title,
                    images,
                },
                aboutSection: {
                    aboutTitle,
                    aboutDescription,
                },
            });
            return res.status(201).json({
                message: "Web content created successfully",
                webContent,
            });
        }
        // DELETE OLD CLOUDINARY IMAGES
        if (webContent.heroSection.images.length > 0) {
            await Promise.all(webContent.heroSection.images.map((img) => (0, cloudinaryDelete_1.deleteFromCloudinary)(img.public_id)));
        }
        // UPDATE DATA
        webContent.heroSection = {
            title,
            images,
        };
        webContent.aboutSection = {
            aboutTitle,
            aboutDescription,
        };
        await webContent.save();
        return res.status(200).json({
            message: "Web content updated successfully",
            webContent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.webHeroSelection = webHeroSelection;
