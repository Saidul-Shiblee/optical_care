import mongoose from "mongoose";
const { Schema } = mongoose;


export const userSchema = Schema(
    {
        email: {
            type:String,
            required: true,
            unique:[true,'Email already registered']

        },
        password: {
            type: String,
            required: true
        }


    },
    { timestamps: true },
    { strict: "throw" }
    )



export default mongoose.models.User || mongoose.model("User", userSchema);
