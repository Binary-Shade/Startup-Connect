import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { STARTUP_VIEWS_BY_ID } from "@/sanity/lib/queries"
import { sanityWrite } from "@/sanity/lib/client-write"
import { unstable_after as after } from "next/server"

const View = async ({id}: {id: string}) => {

  const { views : totalViews } = await client.withConfig({
    useCdn: false // it get a new fresh data other than getting it from CDN cache
  }).fetch(STARTUP_VIEWS_BY_ID, { id })

  after( async () =>{
    await sanityWrite.patch(id).set({views : totalViews + 1}).commit()
  })
  

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <div className="view-text">
        <span className="font-semibold">{ totalViews > 10 ? `${totalViews} views` : `${totalViews} view` }</span>
      </div>
    </div>
  )
}

export default View