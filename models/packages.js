import mongoose from "mongoose";


export const packageSchema = new mongoose.Schema(
    {

        packageName: {
            type: String,
            required: [true, "Package name can't be left blank"],
            unique: true,
        },
    

    },
    { timestamps: true },
    { strict: "throw" }
);

export default mongoose.models.Package || mongoose.model("Package", packageSchema);
