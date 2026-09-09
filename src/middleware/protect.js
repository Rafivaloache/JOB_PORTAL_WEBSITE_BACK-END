
import jwt from "jsonwebtoken"
export const protectRouter = async(req, res, next)=>{
    const token = req.cookies.rafi_token;
    console.log(token)

    if(!token){
        return res.status(401).json({message: "Not authorized"});
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    

   
   
    req.user ={
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
        isSuspend: decoded.isSuspend
    }
    
    
    
    next();


    
}


export const verifyAdmin = async(req, res, next)=>{

    if(req.isSuspend === true ){
        return res.status(401).json({message: "Not authorized"});
    }
    next();

  
}