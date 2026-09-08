
import applicationRepo from "../Repository/ApplicationRepository.js"

export const createApplication = async(body)=>{
   
    const application = await applicationRepo.createApplication(body);
    return application  
}

export const getApplication = async()=>{
    const application = await applicationRepo.getApplication();
    return application
}

export const deleteApplication = async(id)=>{
    const application = await applicationRepo.deleteApplication(id);
    return application
}


export default {
    createApplication,
    getApplication,
    deleteApplication
}