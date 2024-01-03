import dbConnect from "@/lib/monogConnect";
const { ObjectId } = require("mongodb");
import { create, findAll, findAndDelete, findAndUpdate } from "@/services/groupServices";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect()
        let state = await request.json()
        const createdGroup = await create(state,'lens')
        return NextResponse.json(
            {
                data: createdGroup._doc,
                Message:"Lens Type has been created successfully"
            },
            { status: 200 }
        );
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


export async function PUT(request) {
    const { searchParams } = new URL(request.url);
    try {
        await dbConnect()
        let state = await request.json()
        const filter = { _id: new ObjectId(searchParams.get("id")) };
        const editedGroup = await findAndUpdate(filter, { $set: state }, 'lens')
        return NextResponse.json(
            {
                data: editedGroup._doc,
                Message: "Lens Type has been edited successfully"
            },
            { status: 200 }
        );

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


export async function GET() {
    try {
        await dbConnect()
        const groups = await findAll({},'lens')
        return NextResponse.json(
            {
                data: groups
            },
            { status: 200 }
        );

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

export async function DELETE(request){
    const { searchParams } = new URL(request.url);
    try {
        await dbConnect()
        const filter = { _id: new ObjectId(searchParams.get("id")) };
        await findAndDelete(filter,'lens')
        return NextResponse.json(
            {
                Message: "Lens type has been deleted successfully"
            },
            { status: 200 }
        );

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