# Startup-Connect

version conflict in react 19 and sanity 

npm install react@18 react-dom@18 --legacy-peer-deps 

npx sanity@latest schema extract --path=./sanity/extract.json

sanity auto installation using npm

"scripts" :{
    "predev" :"npm run typegen",
    "prebuild":"npm run typegen",
    "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
}


1. live content api
2. incremental statice regeneration [cache based]
3. partial pre-rendering -> static & dynamic rendering together in same route
4. unstable_after -> schedule work to execute after response is finished



  "predev": "npm run typegen",
    "prebuild": "npm run typegen",
    "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"