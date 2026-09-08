import mongoose from "mongoose";




const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:3
    },
    company_name:{
        type:String,
        required:true,
        unique: true,
        min:3
    },
    skills:{
        type:[String],
        required:true
    },
    location:{
        type:String,
        required:true,
        min:3
    },
    type:{
        type:String,
        required:true,
        min:3
    },
    level:{
        type:String,
        required:true,
        
    },
    min_salary:{
        type:String,
        required:true,
        
    },
    max_salary:{
        type:String,
        required:true,
    },
    deadline:{
        type:Date,
        required:true
    },
    job_overview:{
        type:String,
        required:true
    },
    core_responsibility:{
        type:[String],
        required:true
    },
    key_responsibility:{
        type:[String],
        required:true
    },
    company_logo:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"active"
    },
    job_category:{
        type:String,
        required:true
    },
    company_location:{
        type:String,
        required:true
    },




},
{
    timestamps: true
})


const Job = mongoose.model("Job", jobSchema);
export default Job;