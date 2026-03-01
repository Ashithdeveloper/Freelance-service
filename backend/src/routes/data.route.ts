import express from 'express'
import { addProject, addService, deleteProject, deleteService, getWebContent, updateContact, updateProject, updateService } from '../controller/webcontent.controller'
import authMiddleware from '../middleware/middleware'

const router = express.Router()


//get all data
router.get("/getall", authMiddleware ,getWebContent)
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
//edit project
router.put("/editProject/:id",authMiddleware ,updateProject)




export default router