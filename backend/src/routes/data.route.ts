import express from 'express'
import { addProject, addService, createWebContent, deleteProject, deleteService, getWebContent, toggleProjectStatus, updateContact, updateService } from '../controller/webcontent.controller'
import authMiddleware from '../middleware/middleware'

const router = express.Router()


// create data
router.post("/create",authMiddleware ,createWebContent)
//get all data
router.post("/getall",authMiddleware ,getWebContent)
//updateContact
router.put("/updateContact/:id",authMiddleware ,updateContact)
//updateService 
router.put("/updateService/:id",authMiddleware ,updateService)
//add service 
router.post("/addService",authMiddleware ,addService)
//delete service
router.delete("/deleteService/:id",authMiddleware , deleteService)
//delete project
router.delete("/deleteProject/:id",authMiddleware , deleteProject)
//add project
router.post("/addProject",authMiddleware ,addProject)
//Project status
router.put("/toggleProjectStatus/:id",authMiddleware ,toggleProjectStatus)




// get all data
router.get("/getall", getWebContent)

export default router