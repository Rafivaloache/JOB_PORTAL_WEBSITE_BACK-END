import { Router } from "express";
import jobController from "../Controller/JobController.js";
import { protectRouter } from "../middleware/protect.js";



const router = Router();



router.post('/create-job', jobController.createJob);
router.get('/get-jobs', jobController.getjobs)
router.get('/get-job/:id', jobController.getjob);
router.get('/find-job-category', jobController.findJobCategory);
router.get('/search-job', jobController.searchJobs);
router.get('/find-job', jobController.findJob);
router.get('/total-job', jobController.totalJobs);
router.get('/filter-salary',  jobController.filterBySalary);
router.get('/list-job/dashboard', protectRouter, jobController.listJobDashboard);
router.get('/search-job-dashboard', protectRouter, jobController.searchJobsDashboard);
router.get('/job-finds-by-category', protectRouter, jobController.jobFindsByCategory);
router.put('/update-job', protectRouter, jobController.updateJob);
router.delete('/delete-job/:id', protectRouter, jobController.deleteJob);



export default router;