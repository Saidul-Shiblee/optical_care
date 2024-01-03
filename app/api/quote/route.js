import dbConnect from "@/lib/monogConnect";
import groups from "@/models/groups";
import price from "@/models/price";
import Package from "@/models/price";
import { findAll } from "@/services/priceServices";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect()
    let state = await request.json()

    const {
        leftEyeSpherical,
        leftEyeCylindrical,
        leftEyeAdditional,
        rightEyeSpherical,
        rightEyeCylindrical,
        rightEyeAdditional,
        lensType,
        frameType,
        powerType
    }=state

    console.log(leftEyeSpherical,
        leftEyeCylindrical,
        leftEyeAdditional,
        rightEyeSpherical,
        rightEyeCylindrical,
        rightEyeAdditional,
        lensType,
        frameType,
        powerType)


        try {
            // Find the power group for the left eye
            const leftEyeQueryCondition = [
                { sphericalLowerLimit: { $lte: Number(leftEyeSpherical) } },
                { sphericalUpperLimit: { $gte: Number(leftEyeSpherical) } },
                { cylindricalLowerLimit: { $lte: Number(leftEyeCylindrical) } },
                { cylindricalUpperLimit: { $gte: Number(leftEyeCylindrical) } },
                
            ];
            if (leftEyeQueryCondition) {
                leftEyeQueryCondition.push(
                {type: powerType},
                { additionalPowerLowerLimit: { $lte: Number(leftEyeAdditional) } },
                { additionalPowerUpperLimit: { $gte: Number(leftEyeAdditional) } }
                );
            }
            const rightEyeQueryCondition = [
                { sphericalLowerLimit: { $lte: Number(rightEyeSpherical) } },
                { sphericalUpperLimit: { $gte: Number(rightEyeSpherical) } },
                { cylindricalLowerLimit: { $lte: Number(rightEyeCylindrical) } },
                { cylindricalUpperLimit: { $gte: Number(rightEyeCylindrical) } },
                
            ];
            if (rightEyeQueryCondition) {
                rightEyeQueryCondition.push(
                {type: powerType},
                { additionalPowerLowerLimit: { $lte: Number(rightEyeAdditional) } },
                { additionalPowerUpperLimit: { $gte: Number(rightEyeAdditional) } }
                );
            }
          
          
            const left = await groups.findOne({ $and: leftEyeQueryCondition }).lean();
            const right = await groups.findOne({ $and: rightEyeQueryCondition }).lean();


            console.log('jkjkj',left,right)

            if(!left || !right){
                return NextResponse.json(
                    {
                        packages: [],
                        Message: "No Package found"
                    },
                    { status: 200 }
                );
            }

            let groupRef

            left.groupOrder > right.groupOrder ? groupRef = left._id : groupRef = right._id


            let filter = {
                $and: [
                    {
                        lenseType: new ObjectId(lensType)
                    },
                    {
                        group: new ObjectId(groupRef)
                    },

                ]
            }


            const packs = await findAll(filter)

            return NextResponse.json(
                {
                    packages: packs,
                    Message: "Package found"
                },
                { status: 200 }
            );

        } catch (error) {
            console.error("Error:", error.message);
        }


   

}