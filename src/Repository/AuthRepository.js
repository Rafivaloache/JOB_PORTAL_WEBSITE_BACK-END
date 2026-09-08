import User from "../model/User.js";
import Profile from "../model/Profile.js";



export const createUser = async(body)=>{
    const user = await User.create(body);
    return user
}

export const getUsers = async()=>{
    const users = await User.find({}); 
    return users
}

export const searchProfile = async(search)=>{
    const users = await User.find({$or:[{firstName:{$regex: search, $options: "i"}},{lastName:{$regex: search, $options: "i"}}]});
    return users;
}

export const deleteUser = async(data)=>{
    const user = await User.findOneAndDelete({ _id: data?._id });
     await Profile.findOneAndDelete({ user_id: data?._id });
    return user


}
 


export const getUserId = async(id)=>{
    const user = await User.findById(id); 
    return user
}

export const updateProfile = async(body)=>{
    
    const isSuspend = body?.isSuspend === false ? true : false
    
    const user = await User.findOneAndUpdate({ email: body.email },{$set:{firstName: body.firstName, lastName: body.lastName, email: body.email, role: body.role, isSuspend: isSuspend}},{new: true}); 
    return user
}



export default {createUser, getUsers,getUserId, updateProfile, deleteUser, searchProfile}