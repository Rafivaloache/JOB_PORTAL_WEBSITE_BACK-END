import { Router } from "express";
import generateTextJobOverViewController from "../Controller/generateTextOverViewController.js";


const router = Router();


router.post('/generate-text-job-overView', generateTextJobOverViewController.generateTextJobOverView);

router.post('/generate-core-responsibilities', generateTextJobOverViewController.generateTextCoreResponsibilities);
router.post('/generate-key-responsibilities',  generateTextJobOverViewController.genereteKeyResponsibilities);

export default router