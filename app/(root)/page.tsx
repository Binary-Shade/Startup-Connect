import StartupCard, { StartupType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import {  STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch,SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams}: {
  searchParams : Promise<{query?:string}>
}) {
  const query = (await searchParams).query 
  const params = { search : query || null }
  const {data : posts} = await sanityFetch( {query: STARTUP_QUERY, params})  
  const session = await auth()
  console.log("🚀 ~ session:", session?.id)
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
              posts.map((post: StartupType) => (
                <StartupCard key={post._id} post={post}/>
              )
              )
            ) : (
              <p className="no-results">No startups found</p>
            )
          }
          </>
        </ul>
        <SanityLive />
      </section>
      
    </>
  );
} 
