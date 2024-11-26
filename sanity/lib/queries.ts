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
    image,
    description,
    views,
    category
}`)

export const STARTUP_BY_ID = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
  _id,
  title,
    slug,
    _createdAt,
    author -> {
      _id, name, username, image, bio
    }, 
    image,
    description,
    views,
    category,
    pitch
}
  `)

export const STARTUP_VIEWS_BY_ID = defineQuery(`
    *[ _type == "startup" && _id == $id ][0]{
    _id, views
  }
  `)