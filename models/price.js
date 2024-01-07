import mongoose from "mongoose";
const { Schema } = mongoose;


export const priceSchema = Schema(
    {
        lenseType: {
            type:Schema.Types.ObjectId,
            ref: 'Lens',
            required: [true, "Lens Type can't be left blank"]
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: [true, "Group can't be left blank"]
        },
        package: {
            type: Schema.Types.ObjectId,
            ref: 'Package',
            required: [true, "Package can't be left blank"]
        },
        lensePrice: {
            type: Number,
            required: [true, "Lens price can't be left blank"]
        },
       
        groupIdentifier: {
            type: String,
            required:true,
            unique: [true, "This package aleady exixt"]
        },
        attributes: {
            type: String,
     
        },
        rimlessAvailable:{
            type:Boolean,
            default:false
        }
        ,
        rimlessPrice: {
            type: Number,
        },
        rimlessAttributes: {
            type: String,
        },
        remarks: {
            type: String,
      
        }

    },
    { timestamps: true },
    { strict: "throw" }
);

export default mongoose.models.Price || mongoose.model("Price", priceSchema);


