
import profileRepo from "../Repository/ProfileRepository.js";

export const createProfile = async(body)=>{
    const profile = await profileRepo.createProfile(body);
    return profile
}


export const getProfiles = async()=>{
    const profile = await profileRepo.getProfiles();

    return profile

}

export const updateProfile = async(req,res)=>{
    const user = req.params.id;
    const body = req.body;
    const profile = await profileRepo.updateProfile(user, body);
    return profile
}
export const uninqueProfile = async(userId)=>{
    const profile = await profileRepo.uninqueProfile(userId);
    return profile
}

export const getProfilebyId = async(id)=>{
    const profile = await profileRepo.getProfilebyId(id);
    return profile
}



export const updateProfileInfo = async(body)=>{
    const profile = await profileRepo.updateProfileInfo(body);
    return profile

}

export default {createProfile, getProfiles,updateProfile, getProfilebyId, uninqueProfile, updateProfileInfo};