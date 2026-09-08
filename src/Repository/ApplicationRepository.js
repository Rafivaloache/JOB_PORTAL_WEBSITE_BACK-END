import Application from "../model/Application.js";


export const createApplication = async(body)=>{
    
    const application = await Application.create(body);
    return application
}

export const getApplication = async()=>{
    const application = await Application.find({}).populate("job_id","job_category min_salary max_salary deadline company_logo title location type level ").populate("user_id","email firstName lastName");
    return application;
}

export const deleteApplication = async(id)=>{
    const application = await Application.deleteOne({_id:id});
    return application;
}



export default {createApplication, getApplication, deleteApplication}