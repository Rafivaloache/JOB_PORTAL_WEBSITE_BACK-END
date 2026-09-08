import { Router } from "express";
import saveJobController from "../Controller/SaveController.js"
import { protectRouter } from "../middleware/protect.js";

const router = Router();



router.post('/create-save-job', protectRouter, saveJobController.createSaveJob);
router.get('/get-save-jobs', protectRouter, saveJobController.getSaveJobsALL);

router.delete('/delete-save-job/:id', protectRouter, saveJobController.deleteSaveJob);












export default router