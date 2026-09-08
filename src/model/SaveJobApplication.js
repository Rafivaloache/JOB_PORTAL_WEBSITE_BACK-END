import mongoose from "mongoose";



const saveJobschema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "saved"
    }

},
    {
        timestamps: true
    })


const SaveJob = mongoose.model("SaveJob", saveJobschema);
export default SaveJob;