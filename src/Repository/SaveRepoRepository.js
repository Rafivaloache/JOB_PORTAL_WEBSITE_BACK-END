import SaveJob from "../model/SaveJobApplication.js";



export const createSaveJob = async(jobId, userId)=>{
    
    
    const saveJob = await SaveJob.create({job_id:jobId, user_id:userId}); 
    
    return saveJob
}

export const getExistSaveJobs = async(jobid,userId)=>{
    const saveJob = await SaveJob.findOne({job_id:jobid},{user_id:userId});
    
    return saveJob
}

export const deleteSaveJob = async(jobId)=>{
    const saveJob = await SaveJob.findByIdAndDelete(jobId);
    
    return saveJob
}

export const getSaveJobsALL = async(userId)=>{
    
    const saveJob = await SaveJob.find({user_id:userId}).populate("job_id","job_category min_salary max_salary deadline company_logo title location type level ").populate("user_id","email firstName lastName");
    
    return saveJob
    
}



export default {createSaveJob, getExistSaveJobs, deleteSaveJob,getSaveJobsALL}