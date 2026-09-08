import User from "../model/User.js";
import authRepo from "../Repository/AuthRepository.js";


export const createUser = async(body)=>{
    const user = await authRepo.createUser(body);
    return user
}

export const userExist = async(body)=>{
    const user = await User.findOne(body);
    return user
}

export const getUsers = async()=>{
    const users = await authRepo.getUsers();
    return users

}

export const getUserId = async(id)=>{
    const user = await authRepo.getUserId(id);
    return user
}

export const updateProfile = async(body)=>{
    
    const user = await authRepo.updateProfile(body);
    return user
}

export const deleteUser = async(data)=>{

    const user = await authRepo.deleteUser(data);
    return user
}


// export const searchProfile = async(search)=>{
//     const  users = await authRepo.searchProfile(search);
//     return users
// }

export default {createUser, userExist, getUsers, getUserId, updateProfile, deleteUser }
