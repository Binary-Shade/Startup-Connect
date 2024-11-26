import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, sanityToken as token } from '../env'

export const sanityWrite = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
})
