
import dbConnect from "@/lib/monogConnect";
import { find, findAndUpdate } from "@/services/groupServices";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');



export async function POST(request) {

    try {
        await dbConnect()
        let state = await request.json()
        const { email, oldPassword, newPassword } = state
        if (!oldPassword, !newPassword) {
            return NextResponse.json(
                {
                    message: `"Old or new password can not be empty`,
                },
                { status: 400 }
            );
        }
        const user = await find({email:email}, 'user')
        if (!user) {
            return NextResponse.json(
                {
                    message: `User not found`,
                },
                { status: 400 }
            );
        }
        if (await bcrypt.compare(oldPassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await findAndUpdate({ email: email }, { $set: { password: hashedPassword } },'user')
            return NextResponse.json(
                {
                    message: "Password has changed successfully."
                },
                { status: 200 }
            );
        }
        else {
            return NextResponse.json(
                {
                    message: `Wrong old Password`,
                },
                { status: 400 }
            );

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: `Something went wrong`,
            },
            { status: 500 }
        );

    }
}

