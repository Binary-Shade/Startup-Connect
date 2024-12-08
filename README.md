# Startup Connect

Startup Connect is a platform that allows entrepreneurs to register their startups, showcase their ideas, and connect with like-minded individuals worldwide. Built with **Next.js**, this project aims to foster innovation and collaboration in the entrepreneurial community.

## 🚀 Features

- **Startup Registration**: Users can register their startups and upload essential details.
- **Idea Showcase**: Startups can showcase their ideas, attracting potential partners and investors.
- **Global Connectivity**: Connect with entrepreneurs from around the world.
- **Responsive Design**: Optimized for both desktop and mobile users.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: Tailwind CSS (or mention your styling framework)
- **Database**: Sanity [headless cms]
- **Authentication**: Next auth
- **Hosting**: Vercel (or specify your hosting platform)

## 📂 Folder Structure

```
startup-connect/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Next.js pages (routes)
│   ├── styles/      # Global and component styles
│   ├── utils/       # Helper functions
│   ├── hooks/       # Custom hooks
│   └── database/    # Drizzle ORM configuration and schema
├── .env.local       # Environment variables
└── README.md        # Project documentation
```

## ⚙️ Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Binary-Shade/startup-connect.git
   cd startup-connect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and configure the following variables:
   ```env
   AUTH_SECRET= 
    AUTH_GITHUB_ID = 
    AUTH_GITHUB_SECRET = 
    NEXTAUTH_URL= 
    NEXT_PUBLIC_SANITY_PROJECT_ID=
    NEXT_PUBLIC_SANITY_DATASET=
    NEXT_PUBLIC_SANITY_API_VERSION = 
    SANITY_WRITE_TOKEN = 
    SANITY_WRITE_TOKEN = 

   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🚀 Deployment

To deploy this project, follow these steps:

1. Push your code to a GitHub repository.
2. Connect your repository to a hosting platform like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. Add your environment variables in the hosting platform's dashboard.
4. Deploy your project!

## 📷 Screenshots

Add some screenshots of your application here for a better showcase.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

**Happy coding!**
---

## Important notes !!

1 .version conflict in react 19 and sanity 

```
npm install react@18 react-dom@18 --legacy-peer-deps 
```
2. sanity auto installation using npm
```
npx sanity@latest schema extract --path=./sanity/extract.json
```
3. scripts to include :

```
"scripts" :{
    "predev" :"npm run typegen",
    "prebuild":"npm run typegen",
    "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
}
```
5. strategies learned during this project :

1. live content api
2. incremental statice regeneration [cache based]
3. partial pre-rendering -> static & dynamic rendering together in same route
4. unstable_after -> schedule work to execute after response is finished



  "predev": "npm run typegen",
    "prebuild": "npm run typegen",
    "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
