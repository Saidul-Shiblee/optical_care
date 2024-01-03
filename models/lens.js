import mongoose from "mongoose";


export const lensTypeSchema = new mongoose.Schema(
    {

        lensName: {
            type: String,
            required: [true, "Lense type can't be left blank"],
            unique: true,
        
        },
    

    },
    { timestamps: true },
    { strict: "throw" }
);

export default mongoose.models.LensType || mongoose.model("LensType", lensTypeSchema);
