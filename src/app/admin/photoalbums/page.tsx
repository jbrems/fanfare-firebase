import { collection, getDocs } from "firebase/firestore"
import PhotoAlbum, { Album } from "./PhotoAlbum"
import { db } from "@/lib/firebase"

export default async function PhotoAlbumsPage() {
  const categories = await fetchCategories()
  const filteredCategories = categories.filter(c => c.nb_images > 1)
  const albums = filteredCategories.map(mapCategoryToAlbum)
  const existingAlbums = await fetchPhotoAlbums()

  function exists(album: Album): boolean {
    return existingAlbums.some(a => a.id === album.id)
  }

  return <div>
    <h1>Fotoalbum beheer</h1>
    <ul>
      {albums.map(album => <PhotoAlbum key={album.id} album={album} exists={exists(album)} />)}
    </ul>
  </div>
}

type PiwigoCategory = {
  id: number
  name: string
  nb_images: number
  url: string
  tn_url: string
}

async function fetchCategories(): Promise<PiwigoCategory[]> {
  const response = await fetch('https://vdhallen.be/photos/ws.php?format=json&method=pwg.categories.getList&recursive=true&public=true&thumbnail_size=medium')
  const results = await response.json()
  return results.result.categories;
}

function mapCategoryToAlbum(c: PiwigoCategory): Album {
  return {
    ...parseName(c.name),
    url: `${c.url}&display=medium`,
    image: c.tn_url,
  }
}

function parseName(name: string): Pick<Album, 'id' | 'title' | 'date' | 'group'> {
  const id = name.replaceAll(' ', '-').replaceAll('"', '')

  const parsed = /^(FF|MM) (\d*) (.*)$/.exec(name)
  if (!parsed) {
    console.warn('Failed to parse name', name)
    return { id, title: name, group: 'FF', date: 'unknown' }
  }

  let [_, group, date, title] = parsed

  date = date.padEnd(8, '0')
  date = `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`

  return { id, title, group: group as Album['group'], date }
}

async function fetchPhotoAlbums() {
  const querySnapshot = await getDocs(collection(db, "photoalbums"));
  return querySnapshot.docs.map((res) => ({ ...res.data(), id: res.id }));
}
