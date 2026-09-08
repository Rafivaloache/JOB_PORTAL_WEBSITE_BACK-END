import Profile from "../model/Profile.js";
import User from "../model/User.js";


export const createProfile = async(body)=>{
    const profile = await Profile.create(body);
    return profile
}


export const getProfiles = async()=>{
    const profile = await Profile.find().sort({createdAt: 1});
    return profile
}

export const uninqueProfile = async(userId)=>{
    const profile = await Profile.findOne({user_id:userId}).populate("user_id","email firstName lastName");
    return profile
}

export const updateProfileInfo = async(body)=>{
   const user =  await User.findByIdAndUpdate(body.user_id,{
        $set:{
            email:body.email,
            firstName:body.firstName,
            lastName:body.lastName
        },
       
    });
    const profile = await Profile.findByIdAndUpdate(body?.profileId, {
        $set: {
            about_me: body?.about_me,
            address: body?.address,
            
            
            phone: body?.phone,
            
            
        },
        
    });
    return {
        user,
        profile
    }
}

export const updateProfile = async(user, body)=>{
    const profile = await Profile.findByIdAndUpdate({user_id:user}, body);
    // const profile = await Profile.findOneAndUpdate({user_id:user}, body);
    return profile
}

export const getProfilebyId = async(id)=>{
    const profile = await Profile.findById(id);
    return profile
}



export default {createProfile, getProfiles, updateProfile,getProfilebyId, uninqueProfile, updateProfileInfo}