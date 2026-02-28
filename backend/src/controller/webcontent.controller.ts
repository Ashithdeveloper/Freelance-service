import { Request, Response } from "express";
import WebContent from "../models/webContent";
import WebContact from "../models/contactsection";
import Service from "../models/serviceAvailable";
import ProjectPhoto from "../models/projectPhoto";


// export const createWebContent = async (req: Request, res: Response) => {
//   try {
//     const { heroSection, aboutSection, contact, services, projects } = req.body;

//     // Only one WebContent allowed
//     const existing = await WebContent.findOne();
//     if (existing) {
//       return res.status(400).json({
//         message: "Web content already exists. Use update API.",
//       });
//     }

//     // ✅ Create Contact
//     const createdContact = await WebContact.create(contact);

//     // ✅ Create Services
//     const createdServices = await Service.insertMany(services);
//     const serviceIds = createdServices.map((s: any) => s._id);

//     // ✅ Create Projects
//     const createdProjects = await ProjectPhoto.insertMany(projects);
//     const projectIds = createdProjects.map((p: any) => p._id);

//     // ✅ Create WebContent
//     const webContent = await WebContent.create({
//       heroSection,
//       aboutSection,
//       contactSection: createdContact._id,
//       serviceSection: serviceIds,
//       projectSection: projectIds,
//     });

//     return res.status(201).json({
//       message: "Web content created successfully",
//       webContent,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getWebContent = async (req: Request, res: Response) => {
    try {
        const webContent = await WebContent.findOne()
        const webContact = await WebContact.findOne()
        const services = await Service.find()
        const projects = await ProjectPhoto.find()

        if(!webContent || !webContact || !services || !projects) return res.status(404).json({message: "Web content not found" });
        return res.status(200).json({webContent , webContact, services, projects, message: "Web content fetched successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
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
    if(!service) return res.status(400).json({message: "Service is required"});

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
    const project = req.body;
    if(!project) return res.status(400).json({message: "Project is required"});

    const createProject = await ProjectPhoto.create(project);

    if (!createProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(201).json({
      message: "Project added successfully",
      project,
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

    // remove reference from WebContent
    await WebContent.findOneAndUpdate({}, { $pull: { projectSection: id } });

    await ProjectPhoto.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Project Edit 

export const updateProject = async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = req.body;
    if(!project) return res.status(400).json({message: "Project is required"});

    const updatedProject = await ProjectPhoto.findByIdAndUpdate(id, project,  {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    console.log(error);
  }
}


