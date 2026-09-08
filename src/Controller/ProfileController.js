
import Profile from "../model/Profile.js";
import profileService from "../service/ProfileSevice.js";

export const createProfile = async(req,res)=>{
    
    const body = req.body;
    const userId = req.user.id;
    
    const data = {...body, user_id: userId};
    const profile = await profileService.createProfile(data);
    if(profile){
        return res.status(201).json({message: "Profile created successfully", profile});
    }
    else{
        return res.status(400).json({message: "Profile not created"});
    }
}




export const getProfiles = async(req,res)=>{

    const {role} = req.body;
    if(role === "admin"){
        const profile = await profileService.getProfiles();
        return res.status(200).json({message: "Profile fetched successfully", profile});
    }
    else{
        return res.status(401).json({message: "UnAuthorized"});
    }



}

export const updateProfile = async(req,res)=>{
    const user = req.params.id;
    const body = req.body;
    const profile = await profileService.updateProfile(user, body);
    if(profile){
        return res.status(200).json({message: "Profile updated successfully", profile});
    }
    else{
        return res.status(400).json({message: "Profile not updated"});
    }
    
}

export const uninqueProfile = async(req,res)=>{
    
    const userId = req.user.id;
    const createProfile = await profileService.uninqueProfile(userId);
    if(createProfile){
        return res.status(200).json({message: "Profile created successfully", createProfile});
    }
    else{
        return res.status(400).json({message: "Profile not created"});
    }
}

export const getProfilebyId = async(req,res)=>{
    const id = req.params.id;
    
    const profile = await profileService.getProfilebyId(id);
    return res.status(200).json({message: "Profile fetched successfully", profile});
}





const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

export const createProfilePic = async(req,res)=>{
    
    
        const imageUrl = `/uploads/profile/${req.file.filename}`;

        res.status(201).json({
        message: "Profile picture uploaded successfully",
        imageUrl,
        orginialName: req.file.originalname,
        size: formatFileSize(req.file.size),

    });

    // res.status(200).json({message: "Profile pic uploaded successfully"});
}

export const createCoverPic = async(req,res)=>{
   
       const imageUrl = `/uploads/cover/${req.file.filename}`;

        res.status(201).json({
        message: "Profile picture uploaded successfully",
        imageUrl,
        orginialName: req.file.originalname,
        size: formatFileSize(req.file.size),

    });
}

export const showProfileImage = async (req, res) => {
    

    const imageUrl = `/uploads/cover/${req.file.filename}`;

    return res.status(200).json({
        message: "Profile picture uploaded successfully",
        imageUrl
    });
};

export const updateProfileInfo = async(req,res)=>{
    const {about_me, address, firstName, lastName, phone, email, profileId} = req.body;
    const user_id = req.user.id;
    const profileInfo = await profileService.updateProfileInfo({about_me, address,  phone, email, user_id, profileId, firstName, lastName});
    if(profileInfo){
        return res.status(200).json({message: "Profile updated successfully", profileInfo});
    }
    else{
        return res.status(400).json({message: "Profile not updated"});
    }
    
}











export default {createProfile, getProfiles, updateProfile, getProfilebyId,createProfilePic,createCoverPic , showProfileImage, uninqueProfile, updateProfileInfo};