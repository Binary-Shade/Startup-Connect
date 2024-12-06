/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { USER_BY_GITHUB_ID } from "./sanity/lib/queries"
import { sanityWrite } from "./sanity/lib/client-write"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: { 
    async signIn({ user, profile }) {
      const { name, email, image } = user;
      const { id, login, bio } = profile;

      try {
        // Check if the user exists in your Sanity database
        const exists = await client.withConfig({useCdn:false}).fetch(USER_BY_GITHUB_ID, { id });

        if (!exists) {
          await sanityWrite.create({
            _type: "author",
            id,
            name,
            email,
            image,
            username: login,
            bio: bio || ''
          })
          console.log('user created');
          
        } else {
          console.log("User already exists:", exists);
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Reject sign-in
      }
    },
    async jwt({ token , profile, account }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(USER_BY_GITHUB_ID, { id: profile.id })
        console.log(user);
        token.id = user?._id
      }
  
      return token; // Always return the token
    },
    async session({token, session}){
      Object.assign(session, {
        id : token?.id
      })
      return session
    }
  }
})
