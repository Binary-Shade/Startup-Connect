import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";


export default async function Home({searchParams}: {
  searchParams : Promise<{query?:string}>
}) {

  const posts = await client.fetch(STARTUP_QUERY)
  console.log(JSON.stringify(posts));
  
  
  
  // const posts = [{
  //   _createdAt : new Date(),
  //   views: 55,
  //   author: {
  //     _id:1,
  //     name: 'joe biden'
  //   },
  //   _id:1,
  //   description: 'This is the startup description',
  //   image: 'https://images.unsplash.com/photo-1592547097938-7942b22df3db?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   category: 'technology',
  //   title: 'golval texh'
  // }]

  type PostCardType = {
    _createdAt : Date,
    views: number,
    author: {
      _id:number,
      name: string
    },
    _id: number,
    description: string,
    image: string,
    category: string
    title: string
}

  const query = (await searchParams).query 
  return (
    <>
      <section className="pink_container">
      <h2 className="heading">Pitch your startup, <br /> conenct with entrepreneurs</h2>
      <p className="sub-heading !max-w-3xl">submit ideas ,vote on pitches, get noticed in virtual competition.</p>
      <SearchForm query={query} />
    </section>
      <section className="section_container">
        <p className="text-30-semibold font-work-sans">{query ? `search results for "${query}"` : 'All startups'}</p>
        <ul className="mt-7 card_grid">
          <>
          {
            posts?.length > 0 ? (
              posts.map((post: PostCardType) => (
                <StartupCard key={post._id} post={post}/>

              )
              )
            ) : (
              <p className="no-results">No startups found</p>
            )
          }
          </>
        </ul>
      </section>
    </>
  );
} 
