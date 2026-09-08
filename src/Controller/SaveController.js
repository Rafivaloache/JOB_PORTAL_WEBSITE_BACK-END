
import saveJobService from "../service/SaveJobService.js";

export const createSaveJob = async(req,res)=>{
    
    const {job_id} = req.body;
    
   
    const user_id = req.user?.id;
  
    
    const saveExist = await saveJobService.getExistSaveJobs(job_id,user_id);
    if(saveExist){
        
        return res.status(400).json({message: "You have already saved this job"});
    }
    
    

    const saveJob = await saveJobService.createSaveJob(job_id, user_id);
     
    
    if(saveJob){
        
        return res.status(201).json({message: "Save job created successfully", saveJob});
    }
    else{
        
        return res.status(400).json({message: "Save job not created"});
    }

}

export const getSaveJobsALL = async(req,res)=>{

    const userId = req.user?.id;
    
    
    const saveJob = await saveJobService.getSaveJobsALL(userId);
    res.json({message: "Save job fetched successfully", saveJob});
}

// export const getSaveJobs = async(req,res)=>{

//     const user_id = req.user?.id;
    
   
//     const saveJob = await saveJobService.getSaveJobs(user_id);
//     res.json({message: "Save job fetched successfully", saveJob});
    
// }

export const deleteSaveJob = async(req,res)=>{
     
     const savejob_id = req.params.id;
     

    const saveJob = await saveJobService.deleteSaveJob(savejob_id);
    res.status(200).json({message: "Save job deleted successfully", saveJob});
     
}








export default {createSaveJob,  deleteSaveJob,getSaveJobsALL};