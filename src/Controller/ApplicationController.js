
import Application from "../model/Application.js";
import applicationService from "../service/ApplicationService.js";

export const createApplication = async(req,res)=>{
    const {job_id } = req.body;
    
    const user_id = req.user?.id;

    const userExist = await Application.findOne({user_id, job_id});
    
    if(userExist){
        return res.status(400).json({message: "You have already applied for this job"});
    }
    
    const application = await applicationService.createApplication({job_id, user_id});
    
    const io = req.app.get("io");

   io.emit("newApplication", {
    application
    })
    if(application){
        return res.status(201).json({message: "Application created successfully", application})
    }
    else{
        return res.status(400).json({message: "Application not created"})
    }

}

export const deleteApplication = async(req,res)=>{
    const id = req.params.id;
    const application = await applicationService.deleteApplication(id);
    if(application){
        return res.status(200).json({message: "Application deleted successfully", application});
    }
    else{
        return res.status(400).json({message: "Application not deleted"});
    }
}

export const totalApplicationsResults = async(req,res)=>{
    const totalApplications = await Application.countDocuments({});
    res.status(200).json({message: "Total applications fetched successfully", totalApplications})
    
}



export const totalApplications = async(req,res)=>{
    const totalApplications = await Application.aggregate([
        {
            $group:{
                _id:"$job_id",
                count:{$sum:1}
            }

        },  
       
        {
            $lookup:{
                from:"jobs",
                localField:"_id",
                foreignField:"_id",
                as:"job"     
            }
        },
        {
            $unwind:"$job"
        },
        {
            $group:{
                _id:"$job.job_category",
                totalCount:{$sum:"$count"},
               
            }
        },
        {
            $group:{
                _id:null,
                grandTotal:{$sum:"$totalCount"},
                categories:{
                    $push:{
                        category:"$_id",
                        totalCount:"$totalCount"
                    }
                }
            }
        },
        {
            $unwind:"$categories"
        },
       {
           $project:{
               category:"$categories.category",
               totalCount:"$categories.totalCount",
               grandTotal:"$grandTotal",
               percentage:{
                $round:[{
                     $multiply:[{$divide:["$categories.totalCount","$grandTotal"]},100]
                }, 0]
               }
           }
       }
        
       
       
       

       
        
       
      
        
       
        
       
       

        


    




])
    res.status(200).json({message: "Total applications fetched successfully", totalApplications})
}


export const measureJob = async(req,res)=>{
    const measureJobs = await Application.aggregate([{
        $group:{
            _id:"$job_id",
            count:{$sum:1}
            
        },

       
        
        
    },
    {
        $lookup:{
            from:"jobs",
            localField:"_id",
            foreignField:"_id",
            as:"job"     
        }
    },
    {
        $unwind:"$job"
    },
    {
        $project:{
            _id:"$job.title",
            count:"$count"
        }

    },
    {
        $group:{
            _id:"$_id",
            totalCountTitle:{$sum:"$count"}

        }
    },
    {
        $group:{
            _id:null,
            grandTotal:{$sum:"$totalCountTitle"},
            categories:{
                $push:{
                    category:"$_id",
                    totalCount:"$totalCountTitle"
                }
            }
        }
    },
    {
        $unwind:"$categories"
    },
    {
        $project:{
            category:"$categories.category",
            totalCount:"$categories.totalCount",
            
            grandTotal:"$grandTotal",
            percentage:{
             $round:[{
                  $multiply:[{$divide:["$categories.totalCount","$grandTotal"]},100]
             }, 0]
            }
        }
    }
  

  
])
    res.status(200).json({message: "Measure job fetched successfully", measureJobs})
}


export const getApplication = async(req,res)=>{
   
    const application = await applicationService.getApplication();
    res.status(200).json({message: "Application fetched successfully", application})
    
}

export default {createApplication, getApplication, deleteApplication, totalApplications, measureJob,totalApplicationsResults}