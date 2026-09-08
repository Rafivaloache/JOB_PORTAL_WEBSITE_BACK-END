import Job from "../model/Job.js";

export const createJob = async(body)=>{
    const job = await Job.create(body);
    return job

}

export const getjobs = async()=>{
    const jobs = await Job.find({}).sort({

createdAt:-1})  ;
    return jobs
}

export const findJob = async(search, query)=>{
    const pattern = search.trim().replace(/[-\s]+/g, "[-\\s]*");
    if(search){
        query.title = {$regex: pattern, $options: "i"};
    }
    const jobs = await Job.find(query)
    return jobs
}

export const findJobCategory = async(job_category)=>{
    const jobs = await Job.find({job_category:job_category}).sort({
        createdAt:-1
    });
    return jobs

}

export const filterBySalary = async(sortQuery)=>{
    const jobs = await Job.find({}).sort(sortQuery);
    return jobs
}
export const  searchJobs = async(search, location, query)=>{

    const pattern = search.trim().replace(/[-\s]+/g, "[-\\s]*");
    if(search ){
        query.title = {$regex: pattern, $options: "i"};
    }
    if(location){
        query.location = {$regex: location, $options: "i"};
    }
    const jobs = await Job.find(query).sort({
        deadline:-1
    });
    return jobs   
}



export const getjob = async(id)=>{
    const job = await Job.findById(id);
    return job
}


export const jobFindsByCategory = async(category)=>{
    
    
    if(category === "all"){
        
        const jobs = await Job.find({}).sort({
            createdAt:-1
        });
        return jobs
        
    }
    if(category === "active"){
        const jobs = await Job.find({status:"active"}).sort({
            createdAt:-1
        });
        return jobs
    }
    if(category === "closed"){
        const jobs = await Job.find({status:"closed"}).sort({
            createdAt:-1
        });
        return jobs
    }
    if(category === "draft"){
        const jobs = await Job.find({status:"draft"}).sort({
            createdAt:-1
        });
        return jobs
    }
}

export const updateJob = async(body)=>{
    
    const job = await Job.findByIdAndUpdate({_id:body.id},{
        $set:{
            title:body.title,
           
            location:body.location,
            status:body.status
            
        }
    },{returnDocument:"after"});
    return job
}

export const deleteJob = async(id)=>{
    const job = await Job.findByIdAndDelete(id);
    return job
}




export default {createJob, getjobs, getjob, findJobCategory, searchJobs, findJob,filterBySalary, jobFindsByCategory,updateJob,deleteJob} 







