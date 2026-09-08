import { Router } from "express";
import applicationController from "../Controller/ApplicationController.js";
import { protectRouter } from "../middleware/protect.js";

const router = Router();




router.post('/create-application', protectRouter, applicationController.createApplication);
router.get('/get-application', protectRouter, applicationController.getApplication);
router.delete('/delete-application/:id', protectRouter, applicationController.deleteApplication)
router.get('/total-category-result', protectRouter, applicationController.totalApplications);
router.get('/measure-job', protectRouter, applicationController.measureJob);
router.get('/total-application', protectRouter, applicationController.totalApplicationsResults);





export default router