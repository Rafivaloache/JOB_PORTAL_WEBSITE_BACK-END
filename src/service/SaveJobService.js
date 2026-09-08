
import saveRepo from "../Repository/SaveRepoRepository.js";



export const createSaveJob = async(jobId, userId)=>{
    
    
    const saveJob = await saveRepo.createSaveJob(jobId,userId);
    return saveJob

}

export const getSaveJobsALL = async(userId)=>{
    
    const saveJob = await saveRepo.getSaveJobsALL(userId);
    return saveJob
}

export const getExistSaveJobs = async(jobId,userId)=>{
    
    const saveJob = await saveRepo.getExistSaveJobs(jobId,userId);
    return saveJob
}

export const deleteSaveJob = async(jobId)=>{
    const saveJob = await saveRepo.deleteSaveJob(jobId);
    return saveJob
}




export default {
    createSaveJob,
    getExistSaveJobs,
    deleteSaveJob,
    getSaveJobsALL
}