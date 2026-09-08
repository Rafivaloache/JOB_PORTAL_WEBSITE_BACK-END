import mongoose from "mongoose";
import bcrypt from "bcryptjs";




const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user"
    },
    status:{
        type: String,
        default: "inactive"
    },
    isSuspend:{
        type: Boolean,
        default: false
    }
})


userSchema.pre("save", async function(){

    if(!this.isModified("password")){
        return 
        
    }
   
    const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.compare(this.password, salt);
    this.password = await bcrypt.hash(this.password, salt);
    
    
})


const User = mongoose.model("User", userSchema);


export default User