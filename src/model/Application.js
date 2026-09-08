import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
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
        enum: ["applied", "accepted", "rejected"],
        default: "applied"
    }

},{
    timestamps: true
})


const Application = mongoose.model("Application", applicationSchema);
export default Application;