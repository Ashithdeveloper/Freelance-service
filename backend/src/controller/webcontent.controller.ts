import { Request, Response } from "express";
import WebContent from "../models/webContent";
import WebContact from "../models/contactsection";
import Service from "../models/serviceAvailable";
import ProjectPhoto from "../models/projectPhoto";
import { deleteFromCloudinary } from "../utils/cloudinaryDelete";
import { create } from "node:domain";

export const getWebContent = async (req: Request, res: Response) => {
  try {
    const [webContent, webContact, services, projects] = await Promise.all([
      WebContent.findOne().lean(),
      WebContact.findOne().lean(),
      Service.find().lean(),
      ProjectPhoto.find().lean(),
    ]);

    return res.status(200).json({
      webContent,
      webContact,
      services: services || [],
      projects: projects || [],
      message: "Web content fetched successfully",
    });
  } catch (error) {
    console.error("Get Web Content Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// update the web contact

export const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = req.body;
    const updatedContact = await WebContact.findOneAndUpdate({}, contact, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      const webContact = await WebContact.create(contact);
      return res.status(201).json({
        message: "Contact created successfully",
        webContact,
      });
    }

    return res.status(200).json({
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//update service

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Add new service
export const addService = async (req: Request, res: Response) => {
  try {
    const service = req.body;
    if (!service)
      return res.status(400).json({ message: "Service is required" });

    const createService = await Service.create(service);

    return res.status(201).json({
      message: "Service added successfully",
      createService,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Service.findByIdAndDelete(id);

    return res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//ProjectPoto upload

export const addProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      techStack,
      images,
      liveLink,
      githubLink,
      amount,
      isActive,
    } = req.body;

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

    const createProject = await ProjectPhoto.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete project

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const existingProject = await ProjectPhoto.findById(id);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (existingProject.images.length > 0) {
      await Promise.all(
        existingProject.images.map((img: any) =>
          deleteFromCloudinary(img.public_id),
        ),
      );
    }

    const project = await ProjectPhoto.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Project Edit

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }
    const {
      title,
      description,
      techStack,
      images,
      liveLink,
      githubLink,
      amount,
      isActive,
    } = req.body;

    const existingProject = await ProjectPhoto.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (existingProject.images.length > 0) {
      await Promise.all(
        existingProject.images.map((img: any) =>
          deleteFromCloudinary(img.public_id),
        ),
      );
    }
    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : typeof techStack === "string"
        ? techStack.split(",").map((tech: string) => tech.trim())
        : [];

    // ✅ Normalize images
    const parsedImages = Array.isArray(images)
      ? images
      : images
        ? [images]
        : [];

    const updateData: any = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (techStack) updateData.techStack = parsedTechStack;
    if (images) updateData.images = parsedImages;
    if (liveLink) updateData.liveLink = liveLink;
    if (githubLink) updateData.githubLink = githubLink;
    if (amount) updateData.amount = amount;
    if (typeof isActive === "boolean") updateData.isActive = isActive;

    const updatedProject = await ProjectPhoto.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
  }
};

export const webHeroSelection = async (req: Request, res: Response) => {
  try {
    const { title, aboutTitle, aboutDescription, images } = req.body;

    console.log("BODY:", req.body);

    if (!title || !aboutTitle || !aboutDescription) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let webContent = await WebContent.findOne({});

    // CREATE FIRST TIME
    if (!webContent) {
      webContent = await WebContent.create({
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
      await Promise.all(
        webContent.heroSection.images.map((img : any) =>
          deleteFromCloudinary(img.public_id),
        ),
      );
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

