import mongoose from "mongoose";
const { Schema } = mongoose;


export const priceSchema = Schema(
    {
        lenseType: {
            type:Schema.Types.ObjectId,
            ref: 'Lens',
            required: true
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        },
        package: {
            type: Schema.Types.ObjectId,
            ref: 'Package',
            required: true
        },
        lensePrice: {
            type: Number,
            required: true
        },
       
        groupIdentifier: {
            type: String,
            required: true,
            unique:true
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


