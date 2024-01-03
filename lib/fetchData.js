'use server'
import clientPromise from "./mongoDB"
import { cache } from 'react'


export const getLensTypes = cache(async () => {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    let data = await db.collection("lenstypes").find({}).toArray()
    return data
})
