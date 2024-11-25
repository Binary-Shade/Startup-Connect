import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author -> name match $search  ]{
  _id,
  title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    },
    pitch, 
    image,
    description,
    views,
    category
}`)