
import jobRepo from "../Repository/JobRepository.js"

export const createJob = async(body)=>{
    const job = await jobRepo.createJob(body);
    return job;
}

export const getjobs = async()=>{
    const jobs = await jobRepo.getjobs();
    return jobs
}

export const getjob = async(id)=>{
    const job = await jobRepo.getjob(id);
    return job;
}

export const findJobCategory = async(job_category)=>{
    const jobs = await jobRepo.findJobCategory(job_category);
    return jobs;
}

export const searchJobs = async(search, location)=>{
    const query ={
        


    }
    const jobs = await jobRepo.searchJobs(search, location, query);
    return jobs
}

export const filterBySalary = async(sortQuery)=>{
    const jobs = await jobRepo.filterBySalary(sortQuery);
    return jobs
}



export const findJob = async(search)=>{
    const  query ={

    }
    const jobs = await jobRepo.findJob(search, query);
    return jobs
}

export const jobFindsByCategory = async(category)=>{
    if(category === 'all'){
        const jobs = await jobRepo.jobFindsByCategory(category);
        return jobs
    }
    if(category === 'active'){
        const jobs = await jobRepo.jobFindsByCategory(category);
        return jobs
    }
    if(category === 'draft'){
        const jobs = await jobRepo.jobFindsByCategory(category);
        return jobs
    }
    if(category === 'closed'){
        const jobs = await jobRepo.jobFindsByCategory(category);
        return jobs
    }
}

export const  updateJob = async( body)=>{
    const job = await jobRepo.updateJob(body);
    return job;
}

export const deleteJob = async(id)=>{
    const job = await jobRepo.deleteJob(id);
    return job;
}



export default {createJob, getjobs, getjob,findJobCategory, searchJobs, findJob, filterBySalary, jobFindsByCategory, updateJob,deleteJob}