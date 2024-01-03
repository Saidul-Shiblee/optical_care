import mongoose from "mongoose";


export const groupSchema = new mongoose.Schema(
    {

        groupName: {
            type: String,
            required: [true, "Group Name can't be left blank"],
            unique: true,
        },
        groupOrder:{
            type:Number,
            required:true,
            unique: true,
        },
        sphericalLowerLimit: {
            type: Number,
            required: [true, "Spherical Loewr Limit can't be left blank"],

        },
        sphericalUpperLimit: {
            type: Number,
            required: [true, "Spherical Upper Limit can't be left blank"],

        },
        cylindricalLowerLimit: {
            type: Number,
            required: [true, "Cylindrical Loewr Limit can't be left blank"],

        },
        cylindricalUpperLimit: {
            type: Number,
            required: [true, "Cylindrical Upper Limit can't be left blank"],

        },
        additionalPowerLowerLimit: {
            type: Number,
            required: [true, "Additional Lower Limit can't be left blank"],

        },
        additionalPowerUpperLimit: {
            type: Number,
            required: [true, "Additional Upper Limit can't be left blank"],

        },
        type: {
            type: String,
            

        },

    },
    { timestamps: true },
    { strict: "throw" }
);

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
