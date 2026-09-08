

import { GoogleGenAI } from "@google/genai";
import Job from "../model/Job.js";
import jobService from "../service/JobService.js";
import dotenv from 'dotenv';

dotenv.config();



const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
   

})

export const createJob = async(req, res)=>{
    
    const body = req.body
    const job = await jobService.createJob(body)
    if(job){
        return res.status(201).json({message: "Job created successfully", job})
    }
    else{
        return res.status(400).json({message: "Job not created"})
    }
}


export const searchJobs = async(req, res)=>{
    const {search, location} = req.query;
    if(search && location){
        const jobs = await jobService.searchJobs(search, location);
        return res.status(200).json({message: "Jobs fetched successfully", jobs})
    }
   return res.status(400).json({message: "Invalid request"})

}

export const findJob = async(req,res)=>{
    const {search} = req.query;
    
    const jobs = await jobService.findJob(search);
    res.status(200).json({message: "Jobs fetched successfully", jobs})
     
}



export const findJobCategory = async(req,res)=>{
    
    
    const  job_category = req.query.job_category;
    const jobs = await jobService.findJobCategory(job_category);
    res.status(200).json({message: "Jobs fetched successfully", jobs})

}

export const filterBySalary = async(req,res)=>{
    const {salary} = req.query;
    let sortQuery = {};
    if(salary === 'lth'){
        sortQuery = {max_salary: 1};
        
    }
    if(salary === 'htl'){
        sortQuery = {min_salary: 1};
        
    }
    const jobs = await jobService.filterBySalary(sortQuery);
    res.status(200).json({message: "Jobs fetched successfully", jobs});
}
export const getjobs = async(req,res)=>{
     const jobs = await jobService.getjobs();
     
     res.status(200).json({message: "Jobs fetched successfully", jobs})
}

export const getjob = async(req,res)=>{
    const id = req.params.id;
    const job = await jobService.getjob(id);
    res.status(200).json({message: "Job fetched successfully", job})
}

export const totalJobs = async(req,res)=>{
    const jobs = await Job.countDocuments();
    res.status(200).json({message: "Jobs fetched successfully", jobs})
}

export const listJobDashboard = async(req,res)=>{
    const jobs = await Job.aggregate([
        {
            $lookup:{
                from:"applications",
                localField:"_id",
                foreignField:"job_id",
                as:"applications"
            }
        },
       
        {
            $project:{
                _id:1,
                title:1,
                
                min_salary:1,
                max_salary:1,
                location:1,
                
                level:1,
                createdAt:1,
                status:1,
                
                company_name:1,
                applications:{$size:"$applications"}
               
            }

        },
        {
            $sort:{createdAt:-1}
        },   
        
       
       
       
       
    ])

    res.status(200).json({message: "Jobs fetched successfully", jobs})
}

export const searchJobsDashboard = async(req,res)=>{
    const {search} = req.query;
    
    
    const jobs = await Job.aggregate([
        {
            $match:{
                $or:[{title:{$regex:search, $options:"i"}}, {company_name:{$regex:search, $options:"i"}}]
            }
        },
        {
            $lookup:{
                from:"applications",
                localField:"_id",
                foreignField:"job_id",
                as:"applications"
            }
        },

         {
            $project:{
                _id:1,
                title:1,
                
                min_salary:1,
                max_salary:1,
                location:1,
                
                level:1,
                createdAt:1,
                status:1,
                
                company_name:1,
                applications:{$size:"$applications"}
               
            }

        },
        {
            $sort:{createdAt:-1}
        }

        
    ])

    res.status(200).json({message: "Jobs fetched successfully", jobs})



}

export const deleteJob = async(req,res)=>{
    const id = req.params.id;
    const job = await jobService.deleteJob(id);
    res.status(200).json({message: "Job deleted successfully", job})
}


export const jobFindsByCategory = async(req,res)=>{
    const {category} = req.query;
    
    

    if(category === "all"){
        const jobs = await Job.aggregate([
            {
                $lookup:{
                    from:"applications",
                    localField:"_id",
                    foreignField:"job_id",
                    as:"applications"
                }
            },
              {
            $project:{
                _id:1,
                title:1,
                
                min_salary:1,
                max_salary:1,
                location:1,
                
                level:1,
                createdAt:1,
                status:1,
                
                company_name:1,
                applications:{$size:"$applications"},
                company_logo:1
               
            }

        },
        {
            $sort:{createdAt:-1}
        }
        

        ])

        return res.status(200).json({message: "Jobs fetched by real query successfully", jobs})
        
    }
    const jobs = await Job.aggregate([
        {
            $match:{
                status:category
            }
        },
        {
            $lookup:{
                from:"applications",
                localField:"_id",
                foreignField:"job_id",
                as:"applications"
            }
        },
         {
            $project:{
                _id:1,
                title:1,
                
                min_salary:1,
                max_salary:1,
                location:1,
                
                level:1,
                createdAt:1,
                status:1,
                
                company_name:1,
                applications:{$size:"$applications"},
                company_logo:1
               
            }

        },
         {
            $sort:{createdAt:-1}
        }
    ])

    res.status(200).json({message: "Jobs fetched by real query successfully", jobs})
    
    
    
}

export const updateJob = async(req, res)=>{
   
    
    const body = req.body;
    
  
    const job = await jobService.updateJob(body);
    res.status(200).json({message: "Job updated successfully", job});
    
   
}


export default {createJob, getjobs, getjob, findJobCategory,searchJobs, findJob, totalJobs,filterBySalary, listJobDashboard,searchJobsDashboard, jobFindsByCategory, updateJob,deleteJob};