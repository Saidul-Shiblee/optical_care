
import clientPromise from './mongoDB'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// const { ObjectId } = require('mongodb')
// import createToken from './generateAccesstoken'


const auth_options = async () => {
    // Connect to DB
    const client = await clientPromise;
    const db = client.db("test");
    const authOptions = {
        //Cookie valid time
        session: {
            strategy: "jwt",
            maxAge: 60 * 60 * 24,
        },
        // Configure one or more authentication providers
        providers: [
            CredentialsProvider({
                async authorize(credentials) {
                    //Find user with the email
                    let data = await db.collection("users").find({ email: credentials.email }).toArray()
                    //Not found - send error res
                    if (!data[0]) {
                        throw new Error("Invalid account or password details")
                    }
                    //Check hased password with DB password
                    const checkPassword = await bcrypt.compare(
                        credentials.password,
                        data[0].password
                    );
                    //Incorrect password - send error res
                    if (!checkPassword) {
                        throw new Error("Invalid account or password details ")
                    }
                    return data[0];
                },
            }),
        ],
        callbacks: {
            async jwt({ token, user }) {
                return token;
            },
            async session({ user, session, token }) {
                //assign required field in the session
                return session;
            },
        },
        pages: {
            signIn: "/login",
            signOut: "/",
        },

    };

    return authOptions


}

export default auth_options

