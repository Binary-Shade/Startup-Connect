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

// profile {
//   {
//     login: 'Binary-Shade',
//     id: 115919438,
//     node_id: 'U_kgDOBujKTg',
//     avatar_url: 'https://avatars.githubusercontent.com/u/115919438?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/Binary-Shade',
//     html_url: 'https://github.com/Binary-Shade',
//     followers_url: 'https://api.github.com/users/Binary-Shade/followers',
//     following_url: 'https://api.github.com/users/Binary-Shade/following{/other_user}',
//     gists_url: 'https://api.github.com/users/Binary-Shade/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/Binary-Shade/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/Binary-Shade/subscriptions',
//     organizations_url: 'https://api.github.com/users/Binary-Shade/orgs',
//     repos_url: 'https://api.github.com/users/Binary-Shade/repos',
//     events_url: 'https://api.github.com/users/Binary-Shade/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/Binary-Shade/received_events',
//     type: 'User',
//     user_view_type: 'private',
//     site_admin: false,
//     name: 'suresh k',
//     company: '@eat-code-sleep',
//     blog: 'https://binary-shade.netlify.app/',
//     location: 'Tirunelveli',
//     email: '02042003sureshk@gmail.com',
//     hireable: true,
//     bio: ':man_technologist: Suresh k\r\n' +
//       '\r\n' +
//       '\r\n' +
//       ':lady_beetle: Developer\r\n' +
//       ':cactus:    Eat - Code - Sleep :zzz: \r\n' +
//       '\r\n',
//     twitter_username: null,
//     notification_email: null,
//     public_repos: 48,
//     public_gists: 0,
//     followers: 6,
//     following: 5,
//     created_at: '2022-10-16T07:49:35Z',
//     updated_at: '2024-11-11T15:54:17Z',
//     private_gists: 0,
//     total_private_repos: 1,
//     owned_private_repos: 1,
//     disk_usage: 135244,
//     collaborators: 0,
//     two_factor_authentication: false,
//     plan: {
//       name: 'free',
//       space: 976562499,
//       collaborators: 0,
//       private_repos: 10000
//     }
//   }
// }

// user {
//   {
//     id: '5ff6531f-838d-4727-af24-42c67c22321b',
//     name: 'suresh k',
//     email: '02042003sureshk@gmail.com',
//     image: 'https://avatars.githubusercontent.com/u/115919438?v=4'
//   }
// }