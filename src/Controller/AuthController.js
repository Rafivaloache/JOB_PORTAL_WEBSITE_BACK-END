
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

import authService from "../service/AuthService.js";

import User from "../model/User.js";




export const createUser = async(req,res)=>{
    const {firstName, lastName, email, password} = req.body;



   
    
    const userExist = await authService.userExist({email});
    if(userExist){
        return res.status(400).json({message: "User already exist"});
    }

   
    const user = await authService.createUser({firstName, lastName, email, password});
    user.status = "active";
    await user.save();
    const token = await jwt.sign({email, password, isSuspend: false, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.cookie("rafi_token", token, {httpOnly: true,secure: process.env.NODE_ENV === "production", sameSite: "none"});
    res.status(201).json({message: "Registration successfully", user:{
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName
    }});

    
}


export const searchProfile = async(req, res) => {
     const {search} = req.query;
     
     const result = search.trim().replace(/[-\s]+/g, "[-\\s]*");

     const searchUsers = await User.aggregate([
        {$match:{$or:[{firstName:{$regex: result, $options: "i"}},
        {lastName:{$regex: result, $options: "i"}},
        {email:{$regex: result, $options: "i"}},
        {status:{$regex: result, $options: "i"}},
        {$expr:{
            $regexMatch:{
                input: { $concat: ["$firstName", " ", "$lastName"] },
                regex: search,
                options: "i"
            }
        }}]}},
        {$lookup: {from: "profiles", localField: "_id", foreignField: "user_id", as: "user"}},
        {$unwind: "$user"},
        {$project: {_id: 1, firstName: 1, lastName: 1, email: 1, profile: "$user.profile_picture", status:1, role:1, createdAt:"$user.createdAt"}},
        {$sort: {createdAt: -1}},
        {
            $lookup: {
                from: "applications",
                localField: "_id",
                foreignField: "user_id",
                as: "appliedJobs"
            }

        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                profile: 1,
                appliedJobs: {$size: "$appliedJobs"},
                status:1,
                createdAt:1,
                role:1
            }
        }
     ])
     
     

  
    
     res.status(200).json({message: "Users fetched successfully", searchUsers});
    
}





export const logout = async(req,res)=>{

    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(userId,{status:"inactive"});
    user.status = "inactive";
    await user.save();

    res.clearCookie("rafi_token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
    res.status(200).json({message: "Log out successfully"});
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let { role } = req.body;
        if (role === undefined) role = "user";

        const user = await authService.userExist({ email });
        if (!user) {
            return res.status(400).json({ message: "User not exist" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        user.status = "active";
        await user.save();

        const isSuspended = user?.isSuspend === false ? false : true;

        const token = jwt.sign(
            { id: user._id, role: user.role, isSuspend: isSuspended },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("rafi_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });

        if (isSuspended === true) {
            res.clearCookie("rafi_token");
            return res.status(400).json({ message: "Your account has been suspended" });
        }

        res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                email: user.email,
                firstname: user.firstName,
                status: user.status,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("loginUser error:", err);
        res.status(500).json({ message: "Something went wrong, please try again" });
    }
};

export const updateProfile = async(req, res) => {
    const {email,firstName,lastName, role,isSuspend} = req.body;
    
    
    const updated_user = await authService.updateProfile({email,firstName,lastName, role,isSuspend});
    res.status(200).json({message: "Profile updated successfully", updated_user});


}

export const deleteUser = async(req, res)=>{
    
    const data =  req.body;
    
    const delete_user = await authService.deleteUser(data);

    res.status(200).json({message: "User deleted successfully", delete_user});
}

export const setRole = async(req, res) => {

    const {userId} = req.body;
   
    const user = await User.findById(userId);
    
    await user.save();
    res.status(200).json({message: "Role updated successfully", user:{
        role: user?.role
    }});

   
    
}

export const getUsersbyQuery = async(req, res) => {

     const {role} = req.query;
     
     if(role === "all"){
        
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    profile_picture: "$user.profile_picture",
                    status:1,
                    profile_id:"$user._id",
                    role:1,
                    isSuspend:1,
                    createdAt:"$user.createdAt"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "appliedJobs"
                }
            },
            
            {
            $project: {
            _id: 1,
            firstName: 1,
            profile_id:1,
            lastName: 1,
            email: 1,
            role:1,
            status:1,
            profile_picture:1,
            appliedJobs: {
                $size: "$appliedJobs"
            },
            createdAt:1,
            isSuspend:1
        }
    }

            
        ])
        res.status(200).json({message: "Users fetched successfully", users});
     }

     if(role === "recruiter"){
        const users = await User.aggregate([
            {
                $match: {
                    role: "recruiter"
                }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    profile_picture: "$user.profile_picture",
                    status:1,
                    profile_id:"$user._id",
                    role:1,
                    isSuspend:1,
                    createdAt:"$user.createdAt"
                }
             },
             {
                $sort: {
                    createdAt: -1
                }
            },
             {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "appliedJobs"
                }
            },
                  {
            $project: {
            _id: 1,
            firstName: 1,
            profile_id:1,
            lastName: 1,
            email: 1,
            role:1,
            status:1,
            profile_picture:1,
            appliedJobs: {
                $size: "$appliedJobs"
            },
            createdAt:1,
            isSuspend:1
        }
    }
        ])
        res.status(200).json({message: "Users fetched successfully", users});
     }

     

     
    
}


export const getUsers = async(req,res)=>{
    // const users = await authService.getUsers();
    const totalUsers = await User.aggregate([{
        $lookup: {
            from: "profiles",
            localField: "_id",
            foreignField: "user_id",
            as: "profile"
        }

    },
    {
        $unwind: "$profile"
    },
    {
        $project: {
            _id: 1,
            profile_id:"$profile._id",
            profile_picture: "$profile.profile_picture",
            firstName: 1,
            lastName: 1,
            email: 1,
            role:1,
            status:1,
            isSuspend:1,
            createdAt:'$profile.createdAt',
            
        }
    },
    {
        $sort: {
            createdAt: -1
        }
    },
    {
        $lookup: {
            from: "applications",
            localField: "_id",
            foreignField: "user_id",
            as: "appliedJobs"
        }
    },
    {
        $project: {
            _id: 1,
            firstName: 1,
            profile_id:1,
            lastName: 1,
            email: 1,
            role:1,
            status:1,
            profile_picture:1,
            appliedJobs: {
                $size: "$appliedJobs"
            },
            createdAt:1,
            isSuspend:1
        }
    }
   


  

    
    ]);

    

    res.status(200).json({message: "Users fetched successfully", totalUsers})
}

export const profile = async(req,res)=>{
    res.status(200).json({message: "Profile fetched successfully", user: req.user});
}

export const getUserId = async(req,res)=>{
    const id = req.params.id;
    const user = await authService.getUserId(id);
    res.status(200).json({message: "User fetched successfully", user})
}




export default {createUser, logout, loginUser, getUsers,getUserId,profile, searchProfile, setRole, updateProfile, deleteUser, getUsersbyQuery}

