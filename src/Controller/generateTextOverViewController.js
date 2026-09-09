
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export const generateTextJobOverView=async(req,res)=>{
            const {title,company_name, job_category,type,location,level,skills} = req.body;
            console.log("Are you okay, Acting like a")
            const prompt = `
            Create a professional job overview for a job portal.
            
            Job Title: ${title}
            
            
            Skills: ${skills?.join(", ")}
            Location: ${location}
            job_category: ${job_category}
            level: ${level}
            
            Write a professional and attractive job overview.
            
            Rules:
            - Write 1-2 paragraphs.
            - Make it suitable for a real job posting.
            - Clearly explain what the candidate will do.
            - Mention relevant skills naturally.
            - Do not invent company information.
            - Do not say that AI generated it.
            - also add some icon to be more attractive. 
            `;
           
             try{
                //  const response = await ai.models.generateContent({
                //  model: "gemini-2.5-flash",
                //  contents: prompt
                //  });

               const response = await ai.models.generateContent({
                 model: "gemini-3.6-flash",
                 contents: prompt,
                 config: {
                   thinkingConfig: { thinkingLevel: "minimal" }, // kill the thinking overhead
                   maxOutputTokens: 200, // 3-5 lines doesn't need more than this
                 }
                }       );
                  const overview = response.text;
     
                  res.status(200).json({
                      success: true,
                      overview
                  });

                }catch(err){
                    console.log(err?.message)
                      
                      res.status(500).json({
                      success: false,
                      message: "Failed to generate job overview"
                });
             }

    
}


export const generateTextCoreResponsibilities=async(req,res)=>{
  
     const {title,company_name, job_category,type,location,level,skills} = req.body;
     console.log("Are you okay, Acting like a bitch")
            const prompt = `
            Create a professional core responsibilities for a job portal.
            
            Job Title: ${title}
           
            Skills: ${skills?.join(", ")}
            Location: ${location}
            job_category: ${job_category}
            level: ${level}
            
            Write a professional and attractive job overview.
            
            Rules:
            - Write 1-2 paragraphs.
            - Make it suitable for a real job posting.
            - Clearly explain what the candidate will do.
            - Mention relevant skills naturally.
            - Do not invent company information.
            - Do not say that AI generated it.
            - also add some icon to be more attractive.
`;

       try{
            const response = await ai.models.generateContent({
                model: "gemini-3.6-flash",
                contents: prompt
            })
          const core_responsibilities = response.text;
   
          res.status(200).json({
              success: true,
              core_responsibilities
          });

       }catch(err){
        console.log(err?.message)
         
       }

}


export const genereteKeyResponsibilities = async(req,res)=>{
    const {title,company_name, job_category,type,location,level,skills} = req.body;
          const prompt = `
            Create a professional core responsibilities for a job portal.
            
            Job Title: ${title}
            company_name: ${company_name}
           
            Skills: ${skills?.join(", ")}
            Location: ${location}
            job_category: ${job_category}
            level: ${level}
            
            Write a professional and attractive job overview.
            
            Rules:
            - Write 1-2 paragraphs.
            - Make it suitable for a real job posting.
            - Clearly explain what the candidate will do.
            - Mention relevant skills naturally.
            - Do not invent company information.
            - Do not say that AI generated it.
            - also add some icon to be more attractive.
`;


       try{
            const response = await ai.models.generateContent({
                model: "gemini-3.6-flash",
                contents: prompt
            })
          const key_responsibilities = response.text;
   
          res.status(200).json({
              success: true,
              key_responsibilities
          });

       }catch(err){
        console.log(err?.message)
         
       }
}







export default {generateTextJobOverView, generateTextCoreResponsibilities,genereteKeyResponsibilities};