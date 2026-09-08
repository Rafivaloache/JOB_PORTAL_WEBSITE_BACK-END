import mongoose from "mongoose";


 

 const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   
    phone: {
        type: String,
        required: true
    },
    about_me:{
        type: String,
        
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        
    },
    cover_picture: {
        type: String,
        
    },
    resume: {
        type: String,
        
    },
    github: {
        type: String,
        
    },
    linkedin: {
        type: String,
        
    },
    twitter: {
        type: String,
        
    },
    instagram: {
        type: String,
        
    },
    facebook: {
        type: String,
        
    },
    website: {
        type: String,
        
    },
    profile_picture:{
       type: String,
       
    },
    cover_picture: {
        type: String,
        
    },
    skills: {
        type: [String],
        required: true
    },
  
    role: {
        type: String,
        default: "user"
    }
 },{
    timestamps: true
 })


 const Profile = mongoose.model("Profile", profileSchema);
 export default Profile;

